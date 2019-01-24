module.exports = (sequelize, DataTypes) => {
  const uploadData = sequelize.define(
    'uploadData',
    {
      user_id: DataTypes.STRING,
      filename: DataTypes.STRING,
      frendlyFilename: DataTypes.STRING
    },
    {}
  );
  return uploadData;
};
