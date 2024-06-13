import { Response, Request } from 'express';
import { signIn, signUp } from '../services/userService';


export const post_signup = async (req: Request, res: Response) => {
    try {
        const result = await signUp(req);
        console.log(result);
        return res.status(201).send(result);
    } catch (error:unknown) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate key error - UserEmail already exists' });
        } else {
            console.error('Error signing up:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const post_signin = async (req: Request, res: Response) => {
    try {
        const result = await signIn(req);
        res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof Error && error.message && (error.message === 'User not found' || error.message === 'Invalid credentials')) {
            res.status(401).json({ error: error.message });
        } else {
            console.error('Error signing in:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

