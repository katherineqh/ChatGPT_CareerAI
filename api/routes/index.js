
const {Router}=require("express")//解构赋值

const coverLetterRouter=require("./coverLetter")


const router=Router()


router.use('/coverLetter',coverLetterRouter)
// /
module.exports=router