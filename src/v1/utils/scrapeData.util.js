const fs=require("fs")
const axios=require("axios")
const cheerio=require("cheerio")

async function ScrapeData(url,selector){
    try{

        const response=await axios.get(url);
        const $=cheerio.load(response.data)

        const scrapedData=[];

        // extract and store data based on the selector
        $(selector).each((index,element)=>{
            scrapedData.push({id:index+1,data})
        })

        const jsonData=JSON.stringify(scrapedData,null,2);
        fs.writeFileSync('scrapedData.json',jsonData);

        console.log("Scraped data saved at scrapedData.json");

        return scrapedData;

    }catch(err){
        console.log("somthing went wrong at util",err.message)
    }
}

module.exports={
    ScrapeData,
}