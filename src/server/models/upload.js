module.exports = (sequelize, DataTypes) => {
  const uploadData = sequelize.define(
    'uploadData',
    {
      user: DataTypes.STRING,
      filename: DataTypes.STRING
    },
    {}
  );
  return uploadData;
};
