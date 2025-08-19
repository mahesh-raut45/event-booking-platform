import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { username, email, password, contact } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword })

        return NextResponse.json({ message: "Signup successful", userId: newUser._id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}