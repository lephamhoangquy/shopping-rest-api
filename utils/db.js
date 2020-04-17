const mongoose = require("mongoose");

const connectDB = async (connectionStr) => {
  try {
    let db = await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log(`Connected to MongoDB successfully ${db.connection.host}`);
      return db;
    }
    return null;
  } catch (error) {
    console.log(`Connected to DB failed ${error}`);
    return null;
  }
};

module.exports = {
  connectDB,
};
