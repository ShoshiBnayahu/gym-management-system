import { Schema, model, Document, Types } from 'mongoose';


interface IMeeting extends Document {
    userId: number;
    details: string;
    serviceId: Types.ObjectId;
    bussinessId: Types.ObjectId;
    date: string;
    startTime: string;
    id: number;
    duration: number;
}

const meetingSchema: Schema<IMeeting> = new Schema({
    userId: { type: Number, required: true },
    details: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, required: true, ref: 'Service' },
    bussinessId: { type: Schema.Types.ObjectId, required: true, ref: 'Business' },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    id: { type: Number, required: true },
    duration: { type: Number, required: true },
});

const MeetingModel = model<IMeeting>('Meeting', meetingSchema);

export { MeetingModel, IMeeting };