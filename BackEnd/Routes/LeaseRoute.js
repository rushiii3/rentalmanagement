const express = require("express");
const router = express.Router();
const {
  get_lease_gata,
  Update_lease,
  delete_terminate,
  get_tenant_leases,
} = require("../Controller/LeaseController");
const multer = require("multer");

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
router.put('/delete-terminate',delete_terminate);
router.get("/tenant-lease/:id",get_tenant_leases);
module.exports = router;
