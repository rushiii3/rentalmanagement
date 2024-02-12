const Admin = require('../Models/Admin'); // Importing the Admin model
const errorThrow = require("../Middleware/ErrorHandler");
const addAdmin = () => {

// Create a new admin instance
const newAdmin = new Admin({
    firstname: "John",
    middlename: "Doe",
    lastname: "Smith",
    email: "admin@gmail.com",
    phoneNumber: "1234567890",
    role: "A", // Assuming "A" is for admin role
    password: "admin",
    avatar: {
      public_id: "your_public_id",
      url: "your_avatar_url",
    },
    address: {
      streetname: "123 Admin Street",
      city: "Admin City",
      state: "Admin State",
      pincode: 12345,
    },
    joiningDate: new Date(), // Set the joining date to the current date
    isCurrentlyEmployee: true, // Assuming the admin is currently an employee
  });
  
  // Save the admin to the database
  newAdmin.save()
    .then(admin => {
      console.log("Admin inserted successfully:", admin);
    })
    .catch(error => {
      console.error("Error inserting admin:", error);
    });
}

module.exports = {
    addAdmin,
}