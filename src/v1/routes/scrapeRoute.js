const express=require("express")
const router=express.Router();
const {scrapeController}=require("../controllers/scrapeController")
// scrape route endpoint
app.get("/scrape",scrapeController)

module.exports=router;