const express=require("express")
const router=express.Router();
const {getAllbooks,getBooksById,getRandomBooks}=require("../controllers/public/bookController")


router.route("/").get(getAllbooks);
router.route("/:bookId").get(getBooksById)
router.route("/book/random").get(getRandomBooks)

module.exports=router;