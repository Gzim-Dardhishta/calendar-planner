import mongoose, { Schema, Document } from 'mongoose'

export interface IType extends Document {
  name: string;
  color: string;
}

const TypeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true }
    },
    { timestamps: true }
)

export default mongoose.models.Type || mongoose.model<IType>('Type', TypeSchema)
