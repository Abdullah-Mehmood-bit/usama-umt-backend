const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    // mongoose.set('strictQuery', false);
    // mongoose
    //   .connect(process.env.MONGO_URL)
    //   .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    //   .catch((err) => console.log(err));
    try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };