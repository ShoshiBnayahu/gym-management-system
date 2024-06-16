import { Request } from 'express';
import { CustomError } from "../types/customError";
import { BusinessModel } from '../models/businessModel';
import { UserModel } from '../models/userModel';

export const createBusiness = async (req: Request) => {
    const { name, description, address, phone, userId } = req.body;
    if (!name || !description || !address || !phone || !userId)
        throw new CustomError('Missing required fields', 400);

    const isUserIdValid = await UserModel.findById(userId);
    if (!isUserIdValid)
        throw new CustomError('Invalid userId', 422);

    const newBusiness = new BusinessModel({
        name: name,
        description: description,
        address: address,
        phone: phone,
        userId: userId,
    });

    try {
        await newBusiness.save();
    } catch (error) {
        console.error('Error saving business:', error);
        throw new CustomError('Failed to save business', 500);
    }

    return newBusiness;
};

export const updateBusiness = async (req: Request) => {
    const { id, name, description, address, phone, userId } = req.body;
    if (!id || !name || !description || !address || !phone || !userId)
        throw new CustomError('Missing required fields', 400);

    try {
        const businessToUpdate = await BusinessModel.findByIdAndUpdate(id, { name, description, address, phone, userId }, { new: true });
        if (!businessToUpdate) {
            throw new CustomError('Business not found', 404);
        }
        return businessToUpdate;
    } catch (error) {
        console.error('Error updating business:', error);
        throw new CustomError('Failed to update business', 500);
    }
};

export const deleteBusiness = async (req: Request) => {
    const { businessId } = req.params;
    const business = await BusinessModel.findById(businessId);
    if (!business) {
        throw new CustomError('Business not found', 404);
    }

    try {
        const deletedBusiness = await BusinessModel.findByIdAndDelete(businessId);
        return deletedBusiness;
    } catch (error) {
        console.error('Error deleting business:', error);
        throw new CustomError('Failed to delete business', 500);
    }
};

export const getBusinesses = async () => {
    const businesses = await BusinessModel.find();
    return businesses;
};

export const getBusiness = async (req: Request) => {
    const { businessId } = req.params;
    const business = await BusinessModel.findById(businessId);
    if (!business) {
        throw new CustomError('Business not found', 404);
    }
    return business;
};