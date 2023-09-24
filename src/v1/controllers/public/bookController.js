const bookJson=require("../../json/books.json");
const { filterObjectKeys } = require("../../utils/helper");
const fs=require("fs")

const getAllbooks=async(req,res)=>{
try{
    const page=+(req.query.page || 1);
    const limit=+(req.query.limit || 20);
    const query=req.query.query?.toLowercase();//query to search
    const inc=req.query.inc?.split(",") //onl;y include search query

    let booksArray=query
    ? structuredClone(bookJson).filter((book)=>{
       return(
        book.searchInfo?.textSnippet.toLowerCase().includes(query) || book.volumeInfo.title?.includes(query)
        || book.volumeInfo.subtitle?.includes(query)
       )
    }): structuredClone(bookJson)

    if(inc && inc[0]?.trim()){
        booksArray=filterObjectKeys(inc,booksArray)
    }
    return res.status(200).json({
        message:"Books fetched successfully",data:[page,limit,booksArray]
    })

}catch(err){
    res.status(500).json({message:"Failed to fetch data",err:err.message})
}
}

// get books by  id
const getBooksById=async(req,res)=>{
    try{
        const {booksId}=req.params;

        const book=bookJson.find((book)=>+book.id=== +booksId);
        if(!book){
            res.status(404).json({message:"Book not found"})
        }
        return res.status(200).json({message:"Book found successwfully"})

    }catch(err){
        res.status(500).json({
            message:"Failed to fetch data",err:err.message
        })
    }
}

const getRandomBooks=async(req,res)=>{
    try{
        const booksArray=bookJson;
        const randomIndex=Math.floor(Math.random() * booksArray.length);

        return res.status(200).json({message:"Books fetched successfully",booksArray:[randomIndex]})

    }catch(err){
        res.status(500).json({
            message:"Failed to fetch data"
        })
    }
}

module.exports={
    getAllbooks,
    getBooksById,
    getRandomBooks,
}