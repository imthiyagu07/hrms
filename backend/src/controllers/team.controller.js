import db from "../models/index.js";

const Team = db.Team;
const Log = db.Log;
const Employee = db.Employee;
const EmployeeTeam = db.EmployeeTeam;

// Get all teams
export const listTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({where: {organisationId: req.user.orgId}});
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch teams"});
    }
}

//create Team
export const createTeam = async (req, res) => {
    try {
        const {name, description} = req.body;
        const team = await Team.create({
            name, 
            description, 
            organisationId: req.user.orgId
        })
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "team_created",
            meta: {teamId: team.id}
        })
        res.status(201).json(team);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to create team" });
    }
}

//Update team
export const updateTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await Team.findOne({where: {id, organisationId: req.user.orgId}});
        if (!team) return res.status(404).json({error: "Team not found"})
        await team.update(req.body);
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "team_updated",
            meta: {teamId: id}
        })
        res.json(team);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to update team" });
    }
}

//Delete Team
export const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id;
        const team = await Team.findOne({where: {id, organisationId: req.user.orgId}});
        if (!team) return res.status(404).json({error: "TEam not found"});
        await team.destroy()
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "team_deleted",
            meta: {teamId: id}
        })
        res.json({message: "Team deleted"});
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete team" });
    }
}

export const assignEmployee = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const {employeeId} = req.body;
        const team = await Team.findOne({where: {id: teamId, organisationId: req.user.orgId}});
        if (!team) return res.status(404).json({error: "Team not found"});
        const employee = await Employee.findOne({where: {id: employeeId, organisationId: req.user.orgId}})
        if (!employee) return res.status(404).json({error: "Employee not found"});
        await EmployeeTeam.create({
            employeeId,
            teamId
        })
        await Log.create({
            organisationId: req.user.orgId,
            userId: req.user.userId,
            action: "employee_assigned_to_team",
            meta: { employeeId, teamId },
        });

        res.json({ message: "Employee assigned to team successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to assign" });
    }
}

export const unassignEmployee = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const { employeeId } = req.body;
    const record = await EmployeeTeam.findOne({where: { teamId, employeeId }});
    if (!record) return res.status(404).json({ error: "Assignment not found" });
    await record.destroy();
    await Log.create({
      organisationId: req.user.orgId,
      userId: req.user.userId,
      action: "employee_unassigned_from_team",
      meta: { employeeId, teamId },
    });
    res.json({ message: "Employee unassigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unassign" });
  }
};
