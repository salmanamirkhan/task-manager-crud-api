const express = require('express');
const app = express();
const Tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware

app.use(express.static('./public'));
app.use(express.json());

//routes

app.use('/api/v1/tasks', Tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log('server has started on port 5000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
