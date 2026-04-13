import { db } from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {

    try {
        const { email, password } = await req.json();

        //find krnege db m ki user hai ki nhi 
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?",
            [email])

        if (user.length === 0) {
            return NextResponse.json({ message: "User not found" });

        }

        // check krenege ki password match ho rhahai ki nhi 

        const validPassword = bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" });

        }

        // Token generate kenege
        const token = jwt.sign({ id: user[0].id , email: user[0].email } , process.env.JWT_SECRET, { expiresIn: "1d" })

        return NextResponse.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}