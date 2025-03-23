const exp=require("express")
const app=exp();
require('dotenv').config()
const mongoose=require("mongoose");
const userApp = require("./APIs/userApi");
const planApp = require("./APIs/planApi");
const productApp = require("./APIs/productApi")
const foodApp = require ("./APIs/foodApi")
const cors=require('cors')
app.use(cors())

const port=process.env.PORT || 4000

// mongoose.connect(process.env.DBURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
    console.log("DB connection success")
})
.catch(err=> console.log("Error in DB connection",err))


app.use(exp.json())
app.use('/user-api',userApp)
app.use('/plan-api',planApp)
app.use('/product-api',productApp)
app.use('/food-api',foodApp)




