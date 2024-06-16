import { IUser } from '../models/userModel';
import { Request} from 'express'

export interface AuthenticatedRequest extends Request {
  user?: IUser;  
}