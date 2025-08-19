import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        await connectToDatabase();
        const events = await Event.find({});
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}