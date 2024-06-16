import { Response, Request } from 'express';
import { CustomError } from '../types/customError';
import { createService, deleteService, getService, getServices, updateService } from '../services/serviceService';

export const post_service = async (req: Request, res: Response) => {
    try {
        const result = await createService(req);
        console.log(result);
        return res.status(201).send('Service created successfully');
    } catch (error) {
        console.error('Error during create service: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'Error during creating service'});
    }
};



export const get_service = async (req: Request, res: Response) => {
    try {
        const service = await getService(req);
        return res.status(200).json({ service });
    } catch (error) {
        console.error('Error getting service:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'An error occurred while getting the service'});
    }
};

export const get_services = async (req: Request, res: Response) => {
    try {
        const services = await getServices();
        return res.status(200).json({ services });
    } catch (error) {
        console.error('Error getting services:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'An error occurred while getting the services'});
    }
};

export const delete_service = async (req: Request, res: Response) => {
    try {
        await deleteService(req);
        return res.status(201).send('Service deleted successfully');
    } catch (error) {
        console.error('Error deleting services:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'An error occurred while deleting the services'});
    }
};
export const put_service = async (req: Request, res: Response) => {
    try {
        const result = await updateService(req);
        console.log(result);
        return res.status(201).send('Service updated successfully');
    } catch (error) {
        console.error('Error during updating service: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({message: error instanceof CustomError && error.message ||  'Error during updating service'});
    }
};
