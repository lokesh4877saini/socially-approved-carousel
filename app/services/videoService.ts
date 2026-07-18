import { Video } from "@/types/video";

const API = "/api";

interface VideoResponse {
  success: boolean;
  message: string;
  data: Video[];
}

export const getVideos = async (): Promise<Video[]> => {
  const res = await fetch(`${API}/videos`);

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  const json: VideoResponse = await res.json();

  return json.data;
};

export async function likeVideo(
    videoId: string,
    user: string
  ) {
    const res = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        user,
      }),
    });
  
    if (!res.ok) {
      throw new Error("Like failed");
    }
  
    return res.json();
  }
  
  export async function shareVideo(
    videoId: string,
    user: string,
    platform: string
  ) {
    const res = await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        user,
        platform,
      }),
    });
  
    if (!res.ok) {
      throw new Error("Share failed");
    }
  
    return res.json();
  }