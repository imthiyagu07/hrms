'use strict';

export default (sequelize, DataTypes) => {
  const Organisation = sequelize.define('Organisation', {
    name: DataTypes.STRING
  });

  Organisation.associate = (models) => {
    Organisation.hasMany(models.User, { foreignKey: 'organisationId' });
    Organisation.hasMany(models.Employee, { foreignKey: 'organisationId' });
    Organisation.hasMany(models.Team, { foreignKey: 'organisationId' });
    Organisation.hasMany(models.Log, { foreignKey: 'organisationId' });
  };

  return Organisation;
};
