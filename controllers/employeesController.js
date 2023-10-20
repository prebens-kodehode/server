const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find().exec();
  if (!employees)
    return res.status(204).json({ message: "No employees found" });
  res.json(employees);
};

//prettier-ignore
const createEmployee = async (req, res) => {
 if(!req?.body?.firstname || !req?.body?.lastname)
 {
  return res.status(400).json({"message": "First and last names required"})
 }

 try {
  const result = await Employee.create (
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }
  );
  res.status(201).json(result)

 } catch (err) {
  console.error(err)
 }
};

//prettier-ignore
const updateEmployee = async (req, res) => {
  
  if (!req?.body?.id){
      return res.status(400).json({"message": "ID required"})
  }
  const employee = await Employee.findOne({_id: req.body.id}).exec()
  if (!employee)
  {
    return res.status(204).json({"message":`No employee matched ID ${req.body.id}`})
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result)
};

//prettier-ignore
const terminateEmployee = async (req, res) => {
  if (!req?.body?.id){
    return res.status(400).json({"message": "ID required"})
}
const employee = await Employee.findOne({_id: req.body.id}).exec();
if (!employee)
{
  return res.status(204).json({"message":`No employee matched ID ${req.body.id}`})
}
const result = await employee.deleteOne({_id: req.body.id});
res.json(result);
};

//prettier-ignore
const getSingleEmployee = async (req, res) => {
  if (!req.params?.id) return res.status(400).json({"message": "Employee ID required"});
  const employee = await Employee.findOne({_id: req.params.id}).exec()
  if (!employee)
  {
    return res.status(204).json({"message":`No employee matched ID ${req.params.id}`})
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  terminateEmployee,
  getSingleEmployee,
};
