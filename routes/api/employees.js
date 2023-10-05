// imports
const path = require("path");
const express = require("express");
const router = express.Router();

const employeesController = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(terminateEmployee)
  .get(getSingleEmployee);

module.exports = router;
