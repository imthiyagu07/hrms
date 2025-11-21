'use strict';

export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    organisationId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organisation, { foreignKey: 'organisationId' });

    // many-to-many
    Employee.belongsToMany(models.Team, {
      through: models.EmployeeTeam,
      foreignKey: 'employeeId'
    });
  };

  return Employee;
};
