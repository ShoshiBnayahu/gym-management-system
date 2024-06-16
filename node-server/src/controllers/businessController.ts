import { Response, Request } from 'express';
import { CustomError } from '../types/customError';
import { createBusiness, deleteBusiness, getBusiness, getBusinesses, updateBusiness } from '../services/businessService';

export const post_business = async (req: Request, res: Response) => {
    try {
        const result = await createBusiness(req);
        console.log(result);
        return res.status(201).send('Business created successfully');
    } catch (error) {
        console.error('Error during create business: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message ||  'Error during creating business' });
    }
};

export const get_business = async (req: Request, res: Response) => {
    try {
        const business = await getBusiness(req);
        return res.status(200).json({ business });
    } catch (error) {
        console.error('Error getting business:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message ||  'An error occurred while getting the business' });
    }
};

export const get_businesses = async (req: Request, res: Response) => {
    try {
        const businesses = await getBusinesses();
        return res.status(200).json({ businesses });
    } catch (error) {
        console.error('Error getting businesses:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message ||  'An error occurred while getting the businesses' });
    }
};

export const delete_business = async (req: Request, res: Response) => {
    try {
        await deleteBusiness(req);
        return res.status(201).send('Business deleted successfully');
    } catch (error) {
        console.error('Error deleting business:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message ||  'An error occurred while deleting the business' });
    }
};

export const put_business = async (req: Request, res: Response) => {
    try {
        const result = await updateBusiness(req);
        console.log(result);
        return res.status(201).send('Business updated successfully');
    } catch (error) {
        console.error('Error during updating business: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message ||  'Error during updating business' });
    }
};