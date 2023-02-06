import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getOneUser,
    updateProfile,
} from '../controllers/_index';
import { UserSchema, ValidateJoi } from '../middleware/validation/_index';

const userRouter = Router();
// Get all users
userRouter.get('/all', getAllUsers);

// Get one user
userRouter.get('/:id', getOneUser);

// Create a user
userRouter.post('/', ValidateJoi(UserSchema.user.create), createUser);

userRouter.post('/profile-update/:id', updateProfile);

export default userRouter;
