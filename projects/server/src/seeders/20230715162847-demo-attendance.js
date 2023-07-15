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
    await queryInterface.bulkInsert("Attendances", [
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: null,
        date: "2023-07-01",
        isValid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-02",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-03",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-04",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: null,
        date: "2023-07-06",
        isValid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-07",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-08",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-09",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: null,
        date: "2023-07-10",
        isValid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-11",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-13",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-14",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-16",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-17",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 23,
        clock_in: timeNow,
        clock_out: timeNow,
        date: "2023-07-18",
        isValid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
