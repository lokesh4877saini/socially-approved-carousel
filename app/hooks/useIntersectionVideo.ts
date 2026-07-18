"use client";

import { useEffect } from "react";

export function useIntersectionVideo(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.75,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [enabled, videoRef]);
}