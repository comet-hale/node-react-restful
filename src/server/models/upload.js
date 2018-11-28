module.exports = (sequelize, DataTypes) => {
  const uploadData = sequelize.define(
    'uploadData',
    {
      description: DataTypes.STRING,
      filename: DataTypes.STRING
    },
    {}
  );
  return uploadData;
};
