import { NextResponse } from "next/server";
import { getVideos } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Videos fetched successfully.",
    data: getVideos(),
  });
}