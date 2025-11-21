'use strict';

export default (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define('EmployeeTeam', {
    employeeId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  });

  return EmployeeTeam;
};
