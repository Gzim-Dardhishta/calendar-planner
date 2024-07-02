import mongoose, { Schema, Document, ObjectId } from 'mongoose'

export interface IAgenda extends Document {
  dateTime: Date;
  text: string;
  type: mongoose.Schema.Types.ObjectId;
  toWho?: mongoose.Schema.Types.ObjectId
  typeOfService: string
  serviceDuration: string
  startTime: string
  endTime: string
  pauseTime: string
  copyService?: boolean
  copyServiceUUID?: string
  number?: number
  lunch?: boolean
  hotMeal?:boolean
}

const AgendaSchema: Schema = new Schema(
    {
        dateTime: { type: Date, required: true },
        typeOfService: { type: String, required: true},
        serviceDuration: { type: String, required: true},
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        pauseTime: { type: String },
        text: { type: String, required: true },
        copyService: { type: Boolean },
        copyServiceUUID: {type: String},
        number: { type: Number },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
        toWho: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        lunch: { type: Boolean },
        hotMeal: { type: Boolean }
    },
    { timestamps: true }
)

export default mongoose.models.Agenda || mongoose.model<IAgenda>('Agenda', AgendaSchema)
