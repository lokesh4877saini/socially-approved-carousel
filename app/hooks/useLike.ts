"use client";

import { useMutation } from "@tanstack/react-query";
import { likeVideo } from "@/services/videoService";
import { useVideoStore } from "@/store/videoStore";

interface LikePayload {
  videoId: string;
  user: string;
}

export function useLike() {
  const updateVideo = useVideoStore.getState().updateVideo;

  return useMutation({
    mutationFn: ({ videoId, user }: LikePayload) =>
      likeVideo(videoId, user),

    onSuccess: (res, variables) => {
      updateVideo(variables.videoId, {
        likes: res.data.likes,
        liked:true,
      });
    },
  });
}