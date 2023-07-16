/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //format date
    const date = new Date();
    const timeNow = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    var attendance = [];
    for (let i = 1; i < 22; i++) {
      attendance.push({
        user_id: 29,
        clock_in: "07:00:00",
        clock_out: null,
        date: `2023-01-${i}`,
        isValid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    }
    await queryInterface.bulkInsert("Attendances", attendance);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
