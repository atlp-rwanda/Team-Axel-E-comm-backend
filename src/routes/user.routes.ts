import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from '../controllers/_index';
import { UserSchema, ValidateJoi } from '../middleware/validation/_index';
import { JwtUtility } from '../utils/jwt.utils';

const userRouter = Router();
// Get all users
userRouter.get('/all', getAllUsers);

// Get one user
userRouter.get('/:id', getOneUser);

// Create a user
userRouter.post('/', ValidateJoi(UserSchema.user.create), createUser);
//Update user
userRouter.patch('/:id', JwtUtility.authenticate, updateUser);

export default userRouter;
