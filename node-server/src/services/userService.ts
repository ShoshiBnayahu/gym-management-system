
import { Request } from 'express';
import { UserModel } from '../models/userModel';
import { CustomError } from '../types/customError';



export const getUser = async (req: Request)=>{
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
    if (!user)
            throw new CustomError('User not found', 404);
        return user;
}
export const getUsers = async () => {
        const users = await UserModel.find();
        return users
  };