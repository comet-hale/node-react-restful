module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('users', ['id'], {
      type: 'FOREIGN KEY',
      name: 'fk_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
