import { Response, Request } from 'express';
import { signIn, signUp } from '../services/userService';

export const post_signup = async (req: Request, res: Response) => {
    try {
        const result = await signUp(req);
        console.log(result);
        return res.status(201).send('User signed up successfully');
    } catch (error) {
        let status = 500;
        let message = '';
        if (error instanceof Error) {
            if (error.message === 'Missing required fields') {
                message = 'Missing required fields';
                status = 400;
            }
            if (error.message === 'Invalid email address') {
                message = 'Invalid email address';
                status = 422;
            }
            if (error.message === 'Failed to save user') {
                message = 'Failed to save user';
                status = 500;
            }
        }
        console.error('Error during signup:', message);
        return res.status(status).json({ message: 'An error occurred during signup  '+message });
    }
};

export const post_signin = async (req: Request, res: Response) => {
    try {
        const  x = await signIn(req);
        return res.status(201).json({ message: 'User signed in successfully', user: x, token: x });
    } catch (error) {
        let status = 500;
        let message = '';
        if (error instanceof Error) {
            if (error.message === 'User not found') {
                message = 'User not found';
                status = 404;
            }
            if (error.message === 'Invalid credentials') {
                message = 'Invalid credentials';
                status = 401;
            }
        }
        console.error('Error during signin:', message);
        return res.status(status).json({ message: 'An error occurred during signin'+message });
    }
};

