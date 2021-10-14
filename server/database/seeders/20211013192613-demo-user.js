'use strict';
const models = require('../models');
const User = models.User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'User1',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'User2',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkDelete('Users', {}),
    ])
  }
};
