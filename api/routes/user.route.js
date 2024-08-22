import express from 'express'
const router = express.Router();
import {test, updateUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';
router.get('/test',test)
router.post('/update/:id',verifyUser,updateUser);
export default router
