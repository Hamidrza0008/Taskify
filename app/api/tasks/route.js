import { db } from "@/config/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    
    try {
        const authHeader = await req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ message: "No token" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id; //yha pe hame user ka id mila 

        const {searchParams} =new URL(req.url);
        console.log(searchParams)
        const date = searchParams.get("date");

        let query = "SELECT * FROM tasks WHERE user_id = ?";
        let values = [userId];

        if(date){
            query+=" AND DATE(due_date) = ?";
            values.push(date);
        }

        const [rows] = await db.execute(query , values);
        console.log(rows);
        return NextResponse.json(rows);

    } catch (error) {
        return NextResponse.json(error , { message: "Invalid token" }, { status: 401 });
    }
}

export async function POST(req) {
    const authHeader = await req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const body = await req.json();


    const { title, category, description, due_date, priority } = body;

    await db.execute(
        "INSERT INTO tasks (title, category, description, due_date, priority, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, category, description, due_date, priority, userId]
    );
    return Response.json({ message: "Task saved" });

}

export async function PATCH(req) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "No token" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const body = await req.json();
        const { id } = body;
        const [task] = await db.execute(
            "SELECT status FROM tasks WHERE id = ? AND user_id = ?",
            [id, userId] // 🔥 important
        );
        if (task.length === 0) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        const currentStatus = task[0].status;

        const newCurrentStatus = currentStatus === "pending" ? "done" : "pending";

        await db.execute(
            "UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?",
            [newCurrentStatus, id, userId]
        );

        return NextResponse.json({ status: newCurrentStatus });



    } catch (error) {
        return NextResponse.json({ message: "Error", error });
    }


}

export async function DELETE(req) {

    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "No token" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;

        const body = await req.json();
        const { id } = body;

        await db.execute(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?",
            [id, userId] // 🔥 security
        );
        return NextResponse.json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error deleting task",
        });
    }

}