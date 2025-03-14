const exp=require('express')
const planApp=exp.Router()

planApp.get("/",(req,res)=>{
    res.send({messaage:"from plan api"})
})





module.exports=planApp