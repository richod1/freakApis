const port=3000
const express=require("express")
const app=express()
const cors=require("cors")
const helmet=require("helmet")
const cookieParser=require("cookie-parser")
const router=require("./src/v1/routes/scrapeRoute")

// database import
const {connectDatabase}=require("./src/v1/database/connect")

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


// mongo database custom module
connectDatabase();

app.get("/",(req,res)=>{
    res.status(200).json({msg:"freak-apis"})
})

// scrape route main endpoint
app.use("/api/v1",router)

app.listen(port,(err)=>{
    if(err) throw new Error("Failed to start server")
    console.log(`server is ready on http://localhost:${port}`)
})