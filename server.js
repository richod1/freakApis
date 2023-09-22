const port=3000
const express=require("express")
const app=express()
const cors=require("cors")
const helmet=require("helmet")
const { isPropertyAssignment } = require("typescript")


app.use(express.json())
app.use(cors())
app.use(helmet())

app.get("/",(req,res)=>{
    res.status(200).json({msg:"freak-apis"})
})

app.listen(port,(err)=>{
    if(err) throw new Error("Failed to start server")
    console.log(`server is ready on http://localhost:${port}`)
})