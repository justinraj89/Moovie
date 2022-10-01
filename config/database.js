const mongoose = require('mongoose');

console.log('TEST LOG BEFORE MONGO CONNECT')

mongoose.connect(
  process.env.DATABASE_URL  

);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
