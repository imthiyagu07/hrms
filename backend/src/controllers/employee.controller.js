import db from "../models/index.js"

const Employee = db.Employee;
const Log = db.Log;

// GET all employess
export const listEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({where: {organisationId: req.user.orgId}});
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch employees"});
    }
}

// CREATE new employee
export const createEmployee = async (req, res) => {
    try {
        const {firstName, lastName, email, phone} = req.body;
        const newEmployee = await Employee.create({
            firstName,
            lastName,
            email,
            phone,
            organisationId: req.user.orgId
        });
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "employee_created",
            meta: {employeeId: newEmployee.id}
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to create employee"});
    }
}

// UPDATE Employee

export const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findOne({where: {id, organisationId: req.user.orgId}});
        if (!employee) return res.status(404).json({error: "Employee not found"});
        await employee.update(req.body);
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "employee_updated",
            meta: {employeeId: employee.id}
        });
        res.json(employee);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to update employee" });
    }
}

// DELETE Employee
export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findOne({where: {id, organisationId: req.user.orgId}})
        if(!employee) return res.status(404).json({error: "Employee not found"});
        await employee.destroy();
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "employee_deleted",
            meta: {employeeId: id}
        })
        res.json({message: "Employee deleted"});
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete employee" });
    }
}