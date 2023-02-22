//Node.js
const dotenv = require("dotenv")
dotenv.config()

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const operandClient = require("@operandinc/sdk").operandClient;
const indexIDHeaderKey = require("@operandinc/sdk").indexIDHeaderKey;
const ObjectService = require("@operandinc/sdk").ObjectService;

// Open AI Configuration
const configuration = new Configuration({
  // organization:"org-tARV3MyElDoECSPhGmGsS856",
  // apiKey:"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"
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express();


// Routing

// Primary Open AI Route


// Get Models Route
// app.get('/models',async(req,res)=>{
//   const response=await openai.listEngines()
//   res.json({
//     models:response.data
//   })
// })


module.exports = app;
