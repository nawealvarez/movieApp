'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [{
      name: 'Action',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Animation',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Comedy',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Crime',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Drama',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Experimental',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Fantasy',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Historical',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Horror',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Romance',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Science Fiction',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Thriller',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Western',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Other',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkDelete('Genres', {}),
    ])
  }
};
