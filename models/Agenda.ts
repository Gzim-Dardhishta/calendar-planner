import mongoose, { Document, Schema } from 'mongoose';

export interface IAgenda extends Document {
  dateTime: Date;
  text: string;
  createdAt: Date;
}

const AgendaSchema: Schema = new Schema({
  dateTime: { type: Date, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Agenda || mongoose.model<IAgenda>('Agenda', AgendaSchema);
