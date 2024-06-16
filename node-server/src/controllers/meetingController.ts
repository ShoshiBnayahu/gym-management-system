import { Response, Request } from 'express';
import { CustomError } from '../types/customError';
import { createMeeting, deleteMeeting, getMeeting, getMeetings, updateMeeting } from '../services/meetingService';

export const post_meeting = async (req: Request, res: Response) => {
    try {
        const result = await createMeeting(req);
        console.log(result);
        return res.status(201).send('Meeting created successfully');
    }
    catch (error) {
        console.error('Error during create meeting: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message || 'Error during creating meeting' });
    }
};


export const get_meeting = async (req: Request, res: Response) => {
    try {
        const meeting = await getMeeting(req); 
        return res.status(200).json({ meeting });
    }
    catch (error) {
        console.error('Error getting meeting:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message || 'An error occurred while getting the meeting' });
    }
};


export const get_meetings = async (req: Request, res: Response) => {
    try {
        const meetings = await getMeetings();
        return res.status(200).json({ meetings });
    }
    catch (error) {
        console.error('Error getting meetings:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message || 'An error occurred while getting the meetings' });
    }
};

export const delete_meeting = async (req: Request, res: Response) => {
    try {
        await deleteMeeting(req); 
        return res.status(201).send('Meeting deleted successfully');
    }
    catch (error) {
        console.error('Error deleting meeting:', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message || 'An error occurred while deleting the meeting' });
    }
};

export const put_meeting = async (req: Request, res: Response) => {
    try {
        const result = await updateMeeting(req); console.log(result);
        return res.status(201).send('Meeting updated successfully');
    }
    catch (error) {
        console.error('Error during updating meeting: ', error);
        return res.status((error instanceof CustomError && error.code) || 500).json({ message: error instanceof CustomError && error.message || 'Error during updating meeting' });
    }
}; 