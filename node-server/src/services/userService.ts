import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserModel } from '../models/userModel';
import config from '../config/config';
import { validateEmail } from '../utils/emailValidator';
import { CustomError } from '../types/customError';

export const signUp = async (req: Request) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role)
        throw new CustomError('Missing required fields', 400);
    const isEmailValid = await validateEmail(email);
    if (!isEmailValid)
        throw new CustomError('Invalid email address', 422);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username: username,
        password: hashedPassword,
        email: email,
        role: role
    });
    try {
        await newUser.save();
    } catch (error) {
        console.error('Error saving user:', error);
        throw new CustomError('Failed to save user', 500);
    }
    return newUser;
};

export const signIn = async (req: Request) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user)
            throw new CustomError('User not found', 404);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new CustomError('Invalid credentials', 401);
        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret as string, { expiresIn: '1h' });
        return { user, token };
};

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