const express=require("express")
const router=express.Router()
const {getAllUser,getUserById,getRandomUser}=require("../controllers/public/userController")


router.route("/").get(getAllUser);
router.route("/:userId").get(getUserById)
router.route("/user/random").get(getRandomUser)




module.expports=router;