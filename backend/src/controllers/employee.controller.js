import db from "../models/index.js"

const Employee = db.Employee;
const Log = db.Log;
const Team = db.Team;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (phone && !/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ error: "Phone must be 10 digits" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const existing = await Employee.findOne({where:{email, organisationId: req.user.orgId}});
        if (existing) {
            return res.status(400).json({ error: "Employee with this email already exists" });
        }
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
        if (req.body.email && !emailRegex.test(req.body.email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if (req.body.email && req.body.email !== employee.email) {
            const exists = await Employee.findOne({where:{email: req.body.email,organisationId: req.user.orgId}});
            if (exists) {
                return res.status(400).json({ error: "Email already in use" });
            }
        }
        await employee.update(req.body);
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "employee_updated",
            meta: {employeeId: employee.id}
        });
        res.json(employee);
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({ error: "Failed to delete employee" });
    }
}

export const getEmployeeWithTeams = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findOne({where: {id, organisationId: req.user.orgId}, include: {model: Team, through: {attributes: []}}})
        if (!employee) return res.status(404).json({error: "Employee not found"});
        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch employee details"});
    }
}