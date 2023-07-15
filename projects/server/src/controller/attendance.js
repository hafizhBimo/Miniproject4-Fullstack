module.exports = {
  async clockIn(req, res) {
    const userId = req.user.id;
    try {
      //get user data
      const userData = await db.User.findOne({
        where: { id: userId },
      });
      //check if user exist
      if (!userData) {
        return res.status(404).send({
          message: "invalid token",
        });
      }

      //clock in
      const date = new Date();
      const timeNow = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      if (!userData.isValid) {
        return res.status(400).send({
          message: "you already have tapped in for today",
          data: userData.clock_in,
        });
      }
      const tapIn = await db.Attendance.create({
        user_id: userId,
        clock_in: timeNow,
        date: date,
        isValid: false,
        createdAt: date,
        updatedAt: date,
      });

      res.status(200).send({
        message: "clock in success",
        data: tapIn.clock_in,
      });
    } catch (error) {
      return res.status(400).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
