module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        emailAddress: 'demo1@gmail.com',
        username: 'demouser1',
        password: 'demo123'
      },
      {
        emailAddress: 'demo2@gmail.com',
        username: 'demouser2',
        password: 'demo123'
      },
      {
        emailAddress: 'demo3@gmail.com',
        username: 'demouser3',
        password: 'demo123'
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => {}
};
