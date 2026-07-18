import { NextRequest, NextResponse } from "next/server";
import { shareVideo } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { videoId, platform, user } = await req.json();

    if (!videoId || !platform || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "videoId, platform and user are required.",
          data: null,
        },
        { status: 400 }
      );
    }

    const video = shareVideo(videoId, user, platform);

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

    return NextResponse.json(
      {
        success: true,
        message: "Share tracked successfully.",
        data: {
          videoId: video.id,
          shares: video.shares,
          platform,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Share API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
        data: null,
      },
      { status: 500 }
    );
  }
}