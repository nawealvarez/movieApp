'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', [{
      name: 'Start Wars',
      rating: 5,
      cast: ['Mark Hamill','Harrison Ford', 'Carrie Fisher','Billy Dee Williams', 'Alec Guinness', ' Frank Oz'],
      genre_id: 11,
      releaseDate: new Date("1977/01/01"),
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Deadpool',
      rating: 4.5,
      cast: ["Ryan Reynolds", "Karan Soni", "Ed Skrein", "Michael Benyaer"],
      genre_id: 11,
      releaseDate: new Date("2016/01/01"),
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Parasite',
      rating: 4,
      cast: ["Kang-ho Song", "Yeo-jeong Cho", "So-dam Park", "Jang Hye-jin", "Ji-so Jung"],
      genre_id: 5,
      releaseDate: new Date("2019/01/01"),
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Taken',
      rating: 3.5,
      cast: ["Liam Neeson", "Famke Janssen", "Maggie Grace"],
      genre_id: 1,
      releaseDate: new Date("2008/01/01"),
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Harry Potter',
      rating: 3,
      cast: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris", "Maggie Smith"],
      genre_id: 7,
      releaseDate: new Date("2001/01/01"),
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      name: 'Back to the Future',
      rating: 5,
      cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson", "Crispin Glover", "	Thomas F. Wilson"],
      genre_id: 11,
      releaseDate: new Date("1985/11/1"),
      createdAt: new Date(),
      updatedAt: new Date()

    }]);
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
      queryInterface.bulkDelete('Movies', {}),
    ])
  }
};
