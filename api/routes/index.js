
const {Router}=require("express")//解构赋值

const coverLetterRouter=require("./coverLetter")
const mockInterviewRouter=require('./mockInterview')


const router=Router()


router.use('/coverLetter',coverLetterRouter)
router.use('/mockInterview',mockInterviewRouter)

// /
module.exports=router