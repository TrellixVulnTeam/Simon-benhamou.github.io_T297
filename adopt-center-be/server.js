const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const userRouter = require('./routes/usersRequest')
const petRouter = require('./routes/petsRequest')

const app = express();

app.use(express.json())
app.use(cors());
dotenv.config();

app.use('/users', userRouter);
app.use('/pets', petRouter);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=> console.log("MONGODB connected")); 

const port = '5500';
app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
}); 