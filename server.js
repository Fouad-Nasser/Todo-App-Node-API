const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('./Routes/todo');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;




app.use(express.json());


app.use('/todo', todoRouter);


app.use((req, res, next)=>{
  let err = new Error('Error, this end point not found');
  err.status = 404;
  next(err);
});




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  mongoose.connect(process.env.MONGO_URL)
  .then(() =>{
    console.log('connected to db');
  })
  .catch(e=>{
    console.log('Error ',e);
  })
})

