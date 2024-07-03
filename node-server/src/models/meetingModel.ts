import { Schema, model, Document, Types } from 'mongoose';


interface IMeeting extends Document {
    userId: Types.ObjectId;
    details: string;
    serviceId: Types.ObjectId;
    dateTime: Date;
    duration: number;
}

const meetingSchema: Schema<IMeeting> = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    details: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, required: true, ref: 'Service' },
    dateTime: { type: Date, required: true },
    duration: { type: Number, required: true },
});

const MeetingModel = model<IMeeting>('Meeting', meetingSchema);

export { MeetingModel, IMeeting };
