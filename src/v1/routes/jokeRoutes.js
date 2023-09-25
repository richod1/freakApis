const express=require("express")
const router=express.Router()
const {getAllJokes,getJokesById,getRandomJokes}=require("../controllers/public/randomJokesController")

router.route("/").get(getAllJokes);
router.route("/:jokeid").get(getJokesById);
router.route("/joke/random").get(getRandomJokes);

module.exports=router;