const randJokeJson=require("../../json/randomjoke.json");
const { filterObjectKeys } = require("../../utils/helper");



const getAllJokes=async(req,res)=>{
    try{
        const page= +(req.query.page || 1)
        const limit=+(req.query.limit || 10);
        const query=req.query.query?.toLowerCase();
        const inc=req.query.inc?.split(",");

        let randomJokesArray=query
         ? structuredClone(randJokeJson).filter((joke)=>{
            return joke.content.toLowerCase().includes(query);
         })
         : structuredClone(randJokeJson);

         if(inc && inc[0]?.trim()){
            randomJokesArray=filterObjectKeys(inc,randomJokesArray)
         }
         return res.status(200).json({message:"data fetch successfully",data:[page,limit,randomJokesArray]})

    }catch(err){
        res.status(500).json({
            message:"Something went wrong",err:err.message
        })
    }
}

const getJokesById=async(req,res)=>{
    try{
        const {jokeId}=req.params;
        const joke=randJokeJson.find((joke)=>+joke.id===+jokeId);
        if(!joke){
            throw new Error("Joke does not exist")
        }

        return res.status(200).json({
            message:"Joke fetched successfully"
        })

    }catch(err){
        res.status(500).json({message:"Something went wrong",err:err.message})
    }
}

// get random jokes
const getRandomJokes=async(req,res)=>{
    try{
        const randomJokesArrays=randJokeJson;
        const randomIndex=Math.floor(Math.random() * randomJokesArrays.length)
        return res.status(200).json({
            message:'Random Jokes',randomJokesArrays:[randomIndex]
        })
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",err:err.message
        })
    }
}



module.exports={
    getAllJokes,
    getJokesById,
    getRandomJokes,
}