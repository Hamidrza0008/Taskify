import { db } from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // check kr rhe hain ki user exits krta hai ki nhi 
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?",
            [email]);

        if (user.length > 0) {
            return NextResponse.json({ message: "User already exists" });
        }

        // Password Hash kr rhe hain 
        const hashedPassword = await bcrypt.hash(password, 10);

        //save krenege
        db.execute("INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword])

        return NextResponse.json({ message: "User registered successfully" });



    } catch (error) {
        return NextResponse.json({ error: error.message });

    }
}