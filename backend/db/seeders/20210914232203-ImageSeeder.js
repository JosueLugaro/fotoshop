'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Images', [
      {userId: 1, albumId: 1, imageUrl: "https://picsum.photos/id/0/5616/3744", title: "This is a title", content: "This is content", createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 1, imageUrl: "https://picsum.photos/id/1/5616/3744", title: "This is a title", content: "This is content", createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 1, imageUrl: "https://picsum.photos/id/10/2500/1667", title: "This is a title", content: "This is content", createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 1, imageUrl: "https://picsum.photos/id/100/2500/1656", title: "This is a title", content: "This is content", createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, albumId: 1, imageUrl: "https://picsum.photos/id/1000/5626/3635", title: "This is a title", content: "This is content", createdAt: new Date(), updatedAt: new Date()}
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Images', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
