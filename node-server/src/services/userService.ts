import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request} from 'express';
import { UserModel } from '../models/userModel';
import config from '../config/config';

export const signUp = async (req: Request) => {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            throw new Error('Missing required fields');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword, role });
        await newUser.save();
        return newUser;
};

export const signIn = async (req: Request) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret as string, { expiresIn: '1h' });
       return({ user, token });
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};