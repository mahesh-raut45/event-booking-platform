import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and passord are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passord);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        return NextResponse.json({ token, message: "Login successful" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}