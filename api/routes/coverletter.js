
const express = require("express");

const coverLetterRouter=express.Router()

const {getCoverLetter}=require('../controllers/coverLetterController')




coverLetterRouter.post("/", getCoverLetter);



module.exports=coverLetterRouter