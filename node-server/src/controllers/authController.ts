import { signIn, signUp } from "../services/authService";
import { CustomError } from "../types/customError";
import { Response, Request } from 'express';

export const post_signup = async (req: Request, res: Response) => {
    try {
        const result = await signUp(req);
        console.log(result);
        return res.status(201).send('User signed up successfully');
    } catch (error) {
        console.error('Error during signup: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'An error occurred during signup'});
    }
};

export const post_signin = async (req: Request, res: Response) => {
    try {
        const  {user,token} = await signIn(req);
        return res.status(201).json({ message: 'User signed in successfully', user: user, token: token });
    } catch (error) {
        console.error('Error during signin: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'An error occurred during signin'});
    }
};