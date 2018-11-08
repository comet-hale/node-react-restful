
module.exports = (sequelize, DataTypes) => {
  const uploadData = sequelize.define(
    'uploadData',
    {
      filename: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {},
  );
  uploadData.associate = function (models) {
    // associations can be defined here
  };
  return uploadData;
};
