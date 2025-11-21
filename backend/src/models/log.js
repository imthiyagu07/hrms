'use strict';

export default (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    organisationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    meta: DataTypes.JSONB
  });

  Log.associate = (models) => {
    Log.belongsTo(models.Organisation, { foreignKey: 'organisationId' });
    Log.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Log;
};
