const express = require("express");
const connection = require("./config/db");
const { TodosRouter } = require("./routes/todos.route");
const { UserRouter } = require("./routes/user.route");
const app = express();
const {authenticate}= require('./middlewares/authentication')
const cors = require("cors");
app.use(express.json())
require('dotenv').config()

app.use(cors());


app.use('/user',UserRouter)

app.get('/',(req,res)=>
{
    res.send('Hello I am the home page')
})

app.use(authenticate)
app.use('/todos',TodosRouter)


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("listening on 8080");
    console.log('Connection to db successfully')
  } catch (err) {
    console.log("Error on connection to db");
    console.log(err);
  }
});
