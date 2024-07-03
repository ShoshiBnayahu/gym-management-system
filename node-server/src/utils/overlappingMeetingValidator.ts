import { Types } from 'mongoose';
import { MeetingModel } from '../models/meetingModel';


export const checkOverlap = async (dateTime: Date, duration: number, id: Types.ObjectId = new Types.ObjectId()): Promise<boolean> => {
    const endDateTime = new Date(dateTime.getTime() + duration * 60000);
    const overlappingMeeting = await MeetingModel.findOne({
        $or: [
            {
                $and: [
                    { dateTime: { $lt: endDateTime } }, // Check if existing meeting starts before new meeting ends
                    { endDateTime: { $gt: dateTime } }  // Check if existing meeting ends after new meeting starts
                ]
            },
            {
                $and: [
                    { dateTime: { $gte: dateTime } },  // Check if existing meeting starts after or at the same time as new meeting
                    { dateTime: { $lt: endDateTime } } // Check if existing meeting starts before new meeting ends
                ]
            }
        ],
        _id: { $ne: id }
    });

    return !!overlappingMeeting;
};
