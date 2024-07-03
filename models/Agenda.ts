import mongoose, { Schema, Document, ObjectId } from 'mongoose'

export interface IAgenda extends Document {
  dateTime: Date;
  text: string;
  title: string
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
        dateTime: { type: Date },
        typeOfService: { type: String},
        serviceDuration: { type: String},
        title: String,
        startTime: { type: String},
        endTime: { type: String},
        pauseTime: { type: String },
        text: { type: String},
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
