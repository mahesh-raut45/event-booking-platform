import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ error: "User Id is required" }, { status: 400 })
        }

        await Booking.create({ user: userId, event: params.id });
        return NextResponse.json({ message: "Event booked successfully!" });

    } catch (error) {
        return NextResponse.json({ error: "Boking failed" }, { status: 500 })
    }
}