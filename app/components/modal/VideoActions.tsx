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
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }

      shareMutation.mutate({
        videoId: video.id,
        user: "guest",
        platform: "web",
      });
    } catch {}
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

      <button>
        <MessageCircle />
        <p>{video.comments}</p>
      </button>

      <button onClick={handleShare}>
        <Share2 />
        <p>{video.shares}</p>
      </button>

    </div>
  );
}