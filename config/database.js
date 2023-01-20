const mongoose = require("mongoose");

// export the function that creates a database connection
module.exports = {
  connectDB,
};

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.log("err");
    console.log(err, ' connecting to mongodb')
    process.exit(1);
  }
}







// const mongoose = require('mongoose');

// console.log('TEST LOG BEFORE MONGO CONNECT')

// mongoose.connect(
//   process.env.DATABASE_URL  

// );

// const db = mongoose.connection;

// db.on('connected', function() {
//   console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
// });
