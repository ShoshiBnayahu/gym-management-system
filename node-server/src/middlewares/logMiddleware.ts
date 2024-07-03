import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger'; 

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    res.on('finish', () => {
        logger.info(`Response: ${res.statusCode}`);
    });
    next();
};