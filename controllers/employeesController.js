const data = {};

data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

//prettier-ignore
const createEmployee = (req, res) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "id": req.body.id,
  });
};

//prettier-ignore
const updateEmployee = (req, res) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "id": req.body.id,
  });
};

//prettier-ignore
const terminateEmployee = (req, res) => {
  res.json({
    "id": req.body.id,
  });
};

//prettier-ignore
const getSingleEmployee = (req, res) => {
  res.json({
    "id": req.params.id,
  });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  terminateEmployee,
  getSingleEmployee,
};
