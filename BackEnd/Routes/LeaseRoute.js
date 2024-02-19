const express = require("express");
const router = express.Router();
const {
  get_lease_gata,
  Update_lease,
} = require("../Controller/LeaseController");
const multer = require("multer");
// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now(); // Add a timestamp to the filename to make it unique
//     cb(null, timestamp + "_" + file.originalname); // Define the filename format
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

const upload = multer({ storage: storage });
router.get("/get-lease/:id", get_lease_gata);
// router.post('/update-lease', uploadStorage.single("leaseAgreement[]"), Update_lease);
router.post(
  "/update-lease",
  uploadStorage.single("leaseAgreement[]"),
  function (req, res, next) {
    req.fileuplad = req.file;
    next();
  },
  Update_lease
);
module.exports = router;
