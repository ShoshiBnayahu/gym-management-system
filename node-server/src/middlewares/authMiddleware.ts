import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import config from '../config/config';


interface AuthenticatedRequest extends Request {
  user?: IUser;  
}

export const loggedIn = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  let token = req.header('Authorization');
  if (!token) {
    res.status(401).send('Access Denied');
    return;
  }
  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }
    const verified = jwt.verify(token, config.jwtSecret as string);
    req.user = verified as IUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send('Invalid Token');
  }
};

export const adminOnly = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(401).send('Unauthorized!');
    return;
  }
  next();
};