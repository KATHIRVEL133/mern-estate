import express from 'express'
const router = express.Router();
import {deleteUser, test, updateUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';
router.get('/test',test)
router.post('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
export default router
