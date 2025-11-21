'use strict';

export default (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    organisationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Team.associate = (models) => {
    Team.belongsTo(models.Organisation, { foreignKey: 'organisationId' });

    // many-to-many
    Team.belongsToMany(models.Employee, {
      through: models.EmployeeTeam,
      foreignKey: 'teamId'
    });
  };

  return Team;
};
