import express from 'express'
const router = express.Router();
import {deleteUser, getUser, getUserListings, test, updateUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';
router.get('/test',test);
router.post('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
router.get('/listings/:id',verifyUser,getUserListings);
router.get('/:id',verifyUser,getUser);
export default router
