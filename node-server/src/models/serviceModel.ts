import { Schema, model, Document ,Types} from 'mongoose';

interface IService extends Document {
  name: string;
  price: number;
  businessId: Types.ObjectId;
}

const ServiceSchema = new Schema<IService>({
  name: { type: String, required: true },
  price: { type: Number, required: true},
  businessId: { type: Schema.Types.ObjectId, required: true, ref: 'Business' },
});

const ServiceModel = model<IService>('Service', ServiceSchema);
export { ServiceModel, IService };