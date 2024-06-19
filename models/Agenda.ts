import mongoose, { Schema, Document } from 'mongoose';

export interface IAgenda extends Document {
  dateTime: Date;
  text: string;
  type: mongoose.Schema.Types.ObjectId;
}

const AgendaSchema: Schema = new Schema(
  {
    dateTime: { type: Date, required: true },
    text: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Agenda || mongoose.model<IAgenda>('Agenda', AgendaSchema);
