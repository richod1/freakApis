const mongoose=require("mongoose")

const connectDatabase=()=>{
    try{
        mongoose.connect().then(()=>console.log("Database connected successfully"))
        .catch((err)=>console.log("Database disconnected",err.message))
    }catch(err){
        return err;
    }
}

module.exports={
    connectDatabase,
}