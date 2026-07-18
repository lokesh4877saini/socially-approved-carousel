"use client";

import { useMutation } from "@tanstack/react-query";
import { shareVideo } from "@/services/videoService";
import { useVideoStore } from "@/store/videoStore";

interface SharePayload {
  videoId: string;
  user: string;
  platform: string;
}

export function useShare() {
  const updateVideo = useVideoStore.getState().updateVideo;

  return useMutation({
    mutationFn: ({ videoId, user, platform }: SharePayload) =>
      shareVideo(videoId, user, platform),

    onSuccess: (res, variables) => {
      updateVideo(variables.videoId, {
        shares: res.data.shares,
      });
    },
  });
}