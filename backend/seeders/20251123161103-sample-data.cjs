"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if organisation already exists
    const [orgExists] = await queryInterface.sequelize.query(
      `SELECT id FROM "Organisations" WHERE name='DemoCorp' LIMIT 1`
    );

    let orgId;
    if (orgExists.length) {
      orgId = orgExists[0].id;
    } else {
      const org = await queryInterface.bulkInsert(
        "Organisations",
        [
          {
            name: "DemoCorp",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: ["id"] }
      );
      orgId = org[0].id;
    }

    // Check Admin User
    const [userExists] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email='admin@demo.com' LIMIT 1`
    );

    let adminId;
    if (userExists.length) {
      adminId = userExists[0].id;
    } else {
      const admin = await queryInterface.bulkInsert(
        "Users",
        [
          {
            organisationId: orgId,
            name: "Admin User",
            email: "admin@demo.com",
            passwordHash:
              "$2b$10$UiClYsxjL69nxB6B48hgx.2gZYO6DN7UbXQDiQVR0q0aAvHa2lE/G", // password: admin123
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: ["id"] }
      );
      adminId = admin[0].id;
    }

    // EMPLOYEES
    const employees = [
      { firstName: "Alice", lastName: "Johnson", email: "alice@demo.com", phone: "9876543210" },
      { firstName: "Bob", lastName: "Smith", email: "bob@demo.com", phone: "9988776655" },
      { firstName: "Charlie", lastName: "Brown", email: "charlie@demo.com", phone: "9871234560" },
      { firstName: "David", lastName: "Lee", email: "david@demo.com", phone: "9996663333" },
      { firstName: "Eva", lastName: "White", email: "eva@demo.com", phone: "9900112233" },
    ];

    const insertedEmp = [];

    for (let emp of employees) {
      const [exists] = await queryInterface.sequelize.query(
        `SELECT id FROM "Employees" WHERE email='${emp.email}' LIMIT 1`
      );

      if (exists.length) {
        insertedEmp.push(exists[0].id);
      } else {
        const created = await queryInterface.bulkInsert(
          "Employees",
          [
            {
              ...emp,
              organisationId: orgId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { returning: ["id"] }
        );
        insertedEmp.push(created[0].id);
      }
    }

    // TEAMS
    const teams = [
      { name: "Engineering", description: "Handles software development" },
      { name: "HR", description: "Manages hiring & people" },
      { name: "Marketing", description: "Brand and outreach" },
    ];

    const insertedTeams = [];

    for (let team of teams) {
      const [exists] = await queryInterface.sequelize.query(
        `SELECT id FROM "Teams" WHERE name='${team.name}' AND "organisationId"=${orgId} LIMIT 1`
      );

      if (exists.length) {
        insertedTeams.push(exists[0].id);
      } else {
        const created = await queryInterface.bulkInsert(
          "Teams",
          [
            {
              ...team,
              organisationId: orgId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { returning: ["id"] }
        );
        insertedTeams.push(created[0].id);
      }
    }

    // EMPLOYEE ASSIGNMENTS
    const assignments = [
      { employeeId: insertedEmp[0], teamId: insertedTeams[0] },
      { employeeId: insertedEmp[1], teamId: insertedTeams[0] },
      { employeeId: insertedEmp[2], teamId: insertedTeams[1] },
      { employeeId: insertedEmp[3], teamId: insertedTeams[2] },
    ];

    for (let a of assignments) {
      const [exists] = await queryInterface.sequelize.query(
        `SELECT id FROM "EmployeeTeams" WHERE "employeeId"=${a.employeeId} AND "teamId"=${a.teamId} LIMIT 1`
      );

      if (!exists.length) {
        await queryInterface.bulkInsert(
          "EmployeeTeams",
          [
            {
              ...a,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]
        );
      }
    }

    // LOGS (sample activity)
    await queryInterface.bulkInsert("Logs", [
  {
    organisationId: orgId,
    userId: adminId,
    action: "admin_seed_login",
    meta: JSON.stringify({ message: "Admin logged in via seed script" }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    organisationId: orgId,
    userId: adminId,
    action: "sample_data_created",
    meta: JSON.stringify({ employees: insertedEmp.length, teams: insertedTeams.length }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Logs", null, {});
    await queryInterface.bulkDelete("EmployeeTeams", null, {});
    await queryInterface.bulkDelete("Teams", null, {});
    await queryInterface.bulkDelete("Employees", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Organisations", null, {});
  },
};
