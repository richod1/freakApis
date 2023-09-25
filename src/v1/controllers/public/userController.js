const userJson=require("../../json/randomuser.json")
const {filterObjectKeys}=require("../../utils/helper")


// get all user
const getAllUser=async(req,res)=>{
    try{

        const page=+(req.query.page || 1);
        const limit=+(req.query.limit || 10);
        const query=req.query.query?.toLowerCase();
        const inc=req.query.inc?.split(",");


        let randomUsersArray=query
        ? structuredClone(userJson).filter((user)=>{
            return(
                user.name.first.toLowerCase().includes(query) 
                || user.name.last.toLowerCase().includes(query)
                || user.name.title.toLowerCase().includes(query) 
                || user.email.toLowerCase().includes(query)
            )
        }): structuredClone(userJson);
        if(inc && inc[0]?.trim()){
            randomUsersArray=filterObjectKeys(inc,randomUsersArray)
        }

        return res.status(200).json({
            message:"Data fetch successfully",data:[randomUsersArray,page,limit]
        })

    }catch(err){
        // handle err
        console.log("failed to fetche users")
        res.status(500).json({er:err.message})
    }
}

// get user by id
const getUserById=async(req,res)=>{
    try{
        const {userId}=req.params;
        const user=userJson.find((user)=>+user.id===+userId)
        if(!user) throw new Error("User not found");

        return res.status(200).json({message:"User fetched Successfully"})
    }catch(err){
        res.status(500).json({err:err.message})
        console.log("failed to fetch user by id")
        // handle error
    }
}

// get random user
const getRandomUser=async(req,res)=>{
    try{
        const randomUsersArray=userJson;
        const random=Math.floor(Math.random() * randomUsersArray.length)

        return res.status(200).json({message:"Random user Fetched Success"})

    }catch(err){
        // handle err
        res.status(500).json({err:err.message})
        console.log("Failed to process fetch data")
    }
}

// export modules
module.exports={getAllUser,getUserById,getRandomUser};