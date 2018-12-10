module.exports = (sequelize, DataTypes) => {
  const uploadData = sequelize.define(
    'uploadData',
    {
      userId: DataTypes.STRING,
      filename: DataTypes.STRING,
      frendlyFilename: DataTypes.STRING
    },
    {}
  );
  return uploadData;
};
