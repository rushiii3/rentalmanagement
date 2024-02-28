const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const sendMail = require("../utlis/sendMail");
const errorThrow = require("../Middleware/ErrorHandler");
const sendOTP = require("../utlis/sendOTP");
const bcrypt = require("bcryptjs");
cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
 const Admin = require('../Models/Admin');
const hello = (req, res, next) => {
  res.status(200).json({ msg: true });
};
const register = asyncHandler(async (req, res) => {
  const {
    email,
    firstname,
    middlename,
    lastname,
    phoneno,
    role,
    password,
    profile,
  } = req.body;

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    errorThrow("User email already exists!", 400);
  }

  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  const image = profile;

  const result = await cloudinary.uploader.upload(image).catch((error) => {
    errorThrow(error.message, 500);
  });

  if (!result) {
    errorThrow("Failed to upload the image", 500);
  }

  const image_id = result.public_id;
  const image_link = result.secure_url;

  const user = {
    email,
    firstname,
    middlename,
    lastname,
    phoneno,
    role,
    password,
    image_id,
    image_link,
  };

  const activationToken = createActivationToken(user);
  const activationURL = `https://rentalmanagement-omega.vercel.app/activate/${activationToken}`;

  try {
    const maildata = {
      email,
      firstname,
      activationURL,
    };
    await sendMail(maildata);
    res.status(201).json({
      success: true,
      message: `Please check your email (${email}) to activate your account`,
    });
  } catch (error) {
    next(error);
  }
});
const createActivationToken = (user) => {
  return jwt.sign(user, `${process.env.ACTIVATION_SECRET}`, {
    expiresIn: "5m",
  });
};
const activation = asyncHandler(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    if (!activation_token) {
      return res.status(400).json({ error: "Activation token is missing" });
    }

    const newUser = jwt.verify(
      activation_token,
      `${process.env.ACTIVATION_SECRET}`
    );

    const {
      email,
      firstname,
      middlename,
      lastname,
      phoneno,
      role,
      password,
      image_id,
      image_link,
    } = newUser;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      errorThrow("User email already exists!", 400);
    }

    const user = await UserModel.create({
      firstname,
      middlename,
      lastname,
      email,
      phoneNumber: phoneno,
      role,
      password,
      avatar: {
        public_id: image_id,
        url: image_link,
      },
      address: {
        streetname: "N/A",
        city: "N/A",
        state: "N/A",
        pincode: 0,
      },
      creditPoint:0
    });

    if (!user) {
      errorThrow("Internal error while creating user", 500);
    }

    return res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      errorThrow("Activation token has expired", 400);
    }
    errorThrow("Invalid Activation Token", 400);
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      errorThrow("Email or password should not be empty", 400);
    }
    const user = await UserModel.findOne({ email }).select("+password");
    const admin = await Admin.findOne({ email }).select("+password");
    const userlogin = user || admin;
    if (!userlogin) {
      errorThrow("User doesn't exist!", 404);
    }
    const isPasswordValid = await userlogin.comparePassword(password);
    if (!isPasswordValid) {
      errorThrow("Please provide the correct information", 401);
    }
    const UserToken = jwt.sign(JSON.stringify(userlogin), process.env.JWT_SECRET);

    const token = UserToken;
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      userlogin,
      token,
    });
  } catch (error) {
    next(error);
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const {
      email,
      role,
      firstname,
      middlename,
      lastname,
      avatar,
      address,
      phoneNumber,
      _id,
      isCurrentlyEmployee,
      creditPoint
    } = await UserModel.findById(req.user).select(
      "email role firstname middlename lastname avatar address phoneNumber _id creditPoint"
    ) ||  await Admin.findById(req.user).select(
      "email role firstname middlename lastname avatar address phoneNumber _id isCurrentlyEmployee"
    );
    
    const imgurl = avatar.url;
    const user = {
      email,
      role,
      firstname,
      middlename,
      lastname,
      address,
      imgurl,
      phoneNumber,
      _id,
      isCurrentlyEmployee,
      creditPoint
    };
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    next(error);
  }
});
const forgotpassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      errorThrow("User doesn't exist!", 404);
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const maildata = {
      email: user.email,
      firstname: user.firstname,
      OTP: otp,
    };
    await sendOTP(maildata);
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: user.email },
      { $set: { resetPasswordToken: otp, resetPasswordTime: new Date() } },
      { new: true }
    );
    if (!updatedUser) {
      errorThrow("Internal Error", 500);
    }
    res
      .status(200)
      .json({ success: true, message: "Your OTP send to the email" });
  } catch (error) {
    next(error);
  }
});
const verifyotp = asyncHandler(async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      errorThrow("User not found", 404);
    }
    const currentTime = new Date();
    const timeDifferenceInMinutes =
      (currentTime - user.resetPasswordTime) / (1000 * 60);
    if (timeDifferenceInMinutes <= 5) {
      if (user.resetPasswordToken === otp) {
        res
          .status(200)
          .json({ success: true, message: "OTP veified", data: email });
      } else {
        errorThrow("Invalid OTP", 401);
      }
    } else {
      errorThrow("Reset token expired", 401);
    }
  } catch (error) {
    next(error);
  }
});
const changeforgotpassword = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      errorThrow("User not found", 404);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateResult = await UserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (updateResult.nModified === 0) {
      errorThrow("User not found or password unchanged", 400);
    }
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully!" });
  } catch (error) {
    next(error);
  }
});
const UserProfileImageUpdate = asyncHandler(async (req, res, next) => {
  try {
    const { email, image } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    const admin = await Admin.findOne({ email }).select("+password");
    const userlogin = user || admin;

    if (!userlogin) {
      errorThrow("User not found", 404);
    }

    await cloudinary.uploader
      .destroy(userlogin.avatar.public_id)
      .then((result) => console.log(result));

    const result = await cloudinary.uploader.upload(image).catch((error) => {
      errorThrow(error.message, 500);
    });

    if (!result) {
      errorThrow("Failed to upload the image", 500);
    }

    const image_id = result.public_id;
    const image_link = result.secure_url;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userlogin._id,
      {
        $set: {
          avatar: {
            public_id: image_id,
            url: image_link,
          },
        },
      },
      { new: true }
    ) || await Admin.findByIdAndUpdate(
      userlogin._id,
      {
        $set: {
          avatar: {
            public_id: image_id,
            url: image_link,
          },
        },
      },
      { new: true }
    );



    if (!updatedUser) {
      errorThrow("Failed to update user profile", 500);
    }

    res.status(200).json({ msg: true });
  } catch (error) {
    next(error);
  }
});
const get_user = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select(
      "email firstname middlename lastname  address phoneNumber"
    ) || await Admin.findOne({ email }).select(
      "email firstname middlename lastname  address phoneNumber"
    );
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    next(error);
  }
});
const update_user_info = asyncHandler(async (req, res, next) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      email,
      phoneno,
      streetname,
      state,
      city,
      pincode,
      id,
    } = req.body;
    const updatedData = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      phoneNumber: phoneno,
      "address.streetname": streetname,
      "address.state": state,
      "address.city": city,
      "address.pincode": pincode,
      // Add any other fields you want to update
    };

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true } // Return the updated document
    ) || await Admin.findOneAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      errorThrow("Failed to update user profile", 500);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
const update_user_password = asyncHandler(async (req, res, next) => {
  try {
    const { oldpassword, password, id } = req.body;
    const user = await UserModel.findById(id).select("+password");
    const admin = await Admin.findById(id).select("+password");
    const userlogin = user || admin;
    if(!userlogin){
      errorThrow("User doesn't exist!", 404);
    }
    const isOldPasswordValid = await userlogin.comparePassword(oldpassword);
    if (!isOldPasswordValid) {
      errorThrow("Your old password doesn't match", 401);
    }
    userlogin.password = password; 
    await userlogin.save();
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
const logout = asyncHandler(async(req,res,next) => {
  try {
    const {token} = req.cookies;
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    next(error);
  }
})
module.exports = {
  hello,
  register,
  activation,
  login,
  getUser,
  forgotpassword,
  verifyotp,
  changeforgotpassword,
  UserProfileImageUpdate,
  get_user,
  update_user_info,
  update_user_password,
  logout
};
