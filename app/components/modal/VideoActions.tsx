"use client";

import {
  MessageCircle,
  Share2,
} from "lucide-react";

import LikeButton from "../common/LikeButton";

import { Video } from "@/types/video";

import { useLike } from "@/hooks/useLike";
import { useShare } from "@/hooks/useShare";

interface Props {
  video: Video;
}

export default function VideoActions({
  video,
}: Props) {
  const likeMutation = useLike();
  const shareMutation = useShare();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?videoId=${video.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        // Optional: show a toast like "Link copied!"
      }

      shareMutation.mutate({
        videoId: video.id,
        user: "guest",
        platform: "web",
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div className="absolute bottom-24 right-4 flex flex-col items-center gap-6 text-white">

      <LikeButton
        likes={video.likes}
        liked={video.liked ?? false}
        isLoading={likeMutation.isPending}
        onClick={() =>
          likeMutation.mutate({
            videoId: video.id,
            user: "guest",
          })
        }
      />

      <button className="cursor-pointer">
        <MessageCircle />
        <p>{video.comments}</p>
      </button>

      <button onClick={handleShare} className="cursor-pointer">
        <Share2 />
        <p>{video.shares}</p>
      </button>

    </div>
  );
}