import { db } from "@/config/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req, context) {
  try {

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;


    const { params } = context;
    const { id } = await params;

    const [rows] = await db.execute(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId] // 🔥 important
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const { id } = await params;
    const body = await req.json();

    const { title, category, description, priority } = body;

    await db.execute(
      `UPDATE tasks 
       SET title = ?, category = ?, description = ?, priority = ?
       WHERE id = ? AND user_id = ?`,
      [title, category, description, priority, id, userId] // 🔥 security
    );

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Update failed", error },
      { status: 500 }
    );
  }
}