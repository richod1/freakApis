const scrapeModel=require("../models/scraped.model")

async function scrapeController(req,res){
    try{
        const {url,selector}=req.query;
        if(!url || !selector){
            return res.status(400).json({message:"Url and selector is required!"})
        }

        const scrapedData=await scrapeModel.scrapedData(url,selector)
        res.status(200).json({message:"Scraping completed and data is saved in scrapedData.json",
        data:scrapedData});

    }catch(err){
        res.status(500).json({
            message:"failed to scrape data",err:err.message
        })

    }
}

module.exports={
    scrapeController,
}