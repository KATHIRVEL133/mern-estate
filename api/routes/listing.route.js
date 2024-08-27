import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing } from "../controllers/listing.controller.js";
import { deleteListing } from "../controllers/user.controller.js";
const router = express.Router();


router.post('/create',verifyUser,createListing);
router.delete('/delete/:id',verifyUser,deleteListing);
export default router;