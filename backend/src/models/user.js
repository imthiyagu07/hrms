'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    organisationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsTo(models.Organisation, { foreignKey: 'organisationId' });
    User.hasMany(models.Log, { foreignKey: 'userId' });
  };

  return User;
};
