import { Schema, model, Types, Document } from 'mongoose';
interface IBusiness extends Document {
    name: string;
    description: string;
    address: string;
    phone: string;
    userId: Types.ObjectId;
}
const businessSchema: Schema<IBusiness> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const BusinessModel = model<IBusiness>('Business', businessSchema);
export { BusinessModel, IBusiness };