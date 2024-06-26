import mongoose, { Schema, Document } from 'mongoose'

export interface ITypeServiceSchema extends Document {
  name: string;
  category: string;
  linkedLayer?: mongoose.Schema.Types.ObjectId[]
}

const TypeService: Schema = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        linkedLayers: [{ type : mongoose.Schema.Types.ObjectId, ref:'Type'}]
    },
    { timestamps: true }
)

export default mongoose.models.TypeService || mongoose.model<ITypeServiceSchema>('TypeService', TypeService)