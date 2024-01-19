import express from 'express';
const router = express.Router();

import{
    createUser,
    getUser,
    getAllUsers,
    updateUser, 
    loginUser
} from '../../controllers/user/user.js';

router.route('/').post(createUser).get(getAllUsers);
router.route('/id/:id').get(getUser).patch(updateUser);
router.route('/login').post(loginUser)

export default router