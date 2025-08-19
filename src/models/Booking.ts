import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    user: mongoose.Schema.Types.ObjectId;
    event: mongoose.Schema.Types.ObjectId;
    status: "confirmed" | "cancelled";
}

const BookingSchema: Schema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" }
    },
    { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
