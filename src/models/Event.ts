import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    price: number;
    createdBy: string; //userID
}

const EventSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        price: { type: Number, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
