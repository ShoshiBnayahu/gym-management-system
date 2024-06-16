import { Request } from 'express';
import { CustomError } from "../types/customError";
import { MeetingModel } from '../models/meetingModel';
import { BusinessModel } from '../models/businessModel';
import { UserModel } from '../models/userModel';
import { ServiceModel } from '../models/serviceModel';

export const createMeeting = async (req: Request) => {
    const { userId, details, serviceId, date, startTime, duration } = req.body;
    if (!userId || !details || !serviceId ||  !date || !startTime || !duration)
        throw new CustomError('Missing required fields', 400);

    const isUserIdValid = await UserModel.findById(userId);
    if (!isUserIdValid)
        throw new CustomError('Invalid userId', 422);

    const isServiceIdValid = await ServiceModel.findById(serviceId);
    if (!isServiceIdValid)
        throw new CustomError('Invalid serviceId', 422);

    const newMeeting = new MeetingModel({
        userId: userId,
        details: details,
        serviceId: serviceId,
        date: date,
        startTime: startTime,
        duration: duration,
    });

    try {
        await newMeeting.save();
    } catch (error) {
        console.error('Error saving meeting:', error);
        throw new CustomError('Failed to save meeting', 500);
    }

    return newMeeting;
};

export const updateMeeting = async (req: Request) => {
    const { id, userId, details, serviceId, businessId, date, startTime, duration } = req.body;
    if (!id || !userId || !details || !serviceId || !businessId || !date || !startTime || !duration)
        throw new CustomError('Missing required fields', 400);

    const isBusinessIdValid = await BusinessModel.findById(businessId);
    if (!isBusinessIdValid)
        throw new CustomError('Invalid businessId', 422);

    try {
        const meetingToUpdate = await MeetingModel.findByIdAndUpdate(id, { userId, details, serviceId, businessId, date, startTime, duration }, { new: true });
        if (!meetingToUpdate) {
            throw new CustomError('Meeting not found', 404);
        }

        return meetingToUpdate;
    } catch (error) {
        console.error('Error updating meeting:', error);
        throw new CustomError('Failed to update meeting', 500);
    }
};

export const deleteMeeting = async (req: Request) => {
    const { meetingId } = req.params;
    const meeting = await MeetingModel.findById(meetingId);
    if (!meeting) {
        throw new CustomError('Meeting not found', 404);
    }

    try {
        const deletedMeeting = await MeetingModel.findByIdAndDelete(meetingId);
        return deletedMeeting;
    } catch (error) {
        console.error('Error deleting meeting:', error);
        throw new CustomError('Failed to delete meeting', 500);
    }
};

export const getMeetings = async () => {
    const meetings = await MeetingModel.find();
    return meetings;
};

export const getMeeting = async (req: Request) => {
    const { meetingId } = req.params;
    const meeting = await MeetingModel.findById(meetingId);
    if (!meeting) {
        throw new CustomError('Meeting not found', 404);
    }

    return meeting;
};