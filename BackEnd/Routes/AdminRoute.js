const express = require("express");
const router = express.Router();
const {
  add_admin,
  deleteuser,
  get_data,
  graph_data,
} = require("../Controller/Admin");
router.post("/add-admin", add_admin);
router.delete("/delete-admin/:id", deleteuser);
router.get("/get-data", get_data);
router.get("/graph_data", graph_data);
module.exports = router;
