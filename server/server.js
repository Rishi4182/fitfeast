const exp=require("express")
const app=exp();
require('dotenv').config()
const mongoose=require("mongoose");

const port=process.env.PORT || 3000

mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("DB connection success")
})
.catch(err=> console.log("Error in DB connection",err))





