import { NextRequest, NextResponse } from "next/server";
import { likeVideo } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId, user } = await req.json();

    if (!videoId || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "videoId and user are required.",
          data: null,
        },
        { status: 400 }
      );
    }

    const video = likeVideo(videoId,user);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found.",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Video liked successfully.",
      data: {
        videoId,
        likes: video.likes,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
        data: null,
      },
      { status: 500 }
    );
  }
}