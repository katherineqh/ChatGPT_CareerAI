require('dotenv').config()
const express = require("express");
const cors=require('cors')
const bodyParser = require("body-parser");
const app = express();
const router=require('./routes')

app.use(cors())
app.use(express.json())

app.use("/",router)

const port = 3080;

app.use(bodyParser.json());
app.use(cors());
app.use(require("morgan")("dev"));


// Start the server
app.listen(port, () => {
  console.log(`server running at "http://localhost:3080/"`);
});

module.exports = app;