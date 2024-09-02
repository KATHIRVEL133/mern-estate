import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing,getListings,updateListing ,getListings2} from "../controllers/listing.controller.js";
import { deleteListing } from "../controllers/user.controller.js";
const router = express.Router();


router.post('/create',verifyUser,createListing);
router.delete('/delete/:id',verifyUser,deleteListing);
router.post('/update/:id',verifyUser,updateListing);
router.get('/getListing/:id',getListings);
router.get('/get',getListings2);
export default router;