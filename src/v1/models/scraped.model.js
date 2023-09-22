/***
 * not your normal model
 * @params require(model**)
 */
const cheerio=require("cheerio")
const axios=require("axios")
const fs=require("fs")

async function scrapedData(url,selector){
    try{
        const response=await axios.get(url);
        const $=cheerio.load(response)

        const scrapeData=[];

        $(selector).each((index,element)=>{
            const data=$(element).text();
            scrapeData.push({id:index + 1,data})
        })

        const jsonData=JSON.stringify(scrapeData,null,2);
        fs.writeFileSync('scrapedData.json',jsonData);
        console.log("scraped data saved in scrapedData.json")
        return jsonData;


    }catch(err){
        console.log('Error',err);
        throw err;
    }
}

module.exports={scrapedData};