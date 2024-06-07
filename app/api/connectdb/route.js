import { NextResponse } from "next/server";
import connectDB from "@/utils/db";

export const GET = async (request) => {
  try {
    await connectDB();

    return new NextResponse("Connected to database", { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
