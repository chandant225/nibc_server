const mongoose = require("mongoose");
const { configs } = require("../configs/configuration");

const database_connection = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      const connection = await mongoose.connect(configs.mongodbURL, {});
      connection && console.log("db connection established");
    }
  } catch (err) {
    console.log("error in database connection", err);
  }
};

module.exports.database_connection = database_connection;
