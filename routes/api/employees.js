// imports
const path = require("path");
const express = require("express");
const router = express.Router();

const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.createEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin),employeesController.terminateEmployee);

router.route("/:id").get(employeesController.getSingleEmployee);

module.exports = router;
