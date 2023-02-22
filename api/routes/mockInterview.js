const express = require("express");

const mockInterviewRouter=express.Router()

const {mockInterview}=require('../controllers/mockInterview')




mockInterviewRouter.post("/", mockInterview);



module.exports=mockInterviewRouter