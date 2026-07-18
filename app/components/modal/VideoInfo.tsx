"use client";

import { Video } from "@/types/video";

interface Props {
  video: Video;
}

export default function VideoInfo({
  video,
}: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-20 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-white">

      <h2 className="text-lg font-bold">
        {video.title}
      </h2>

      <p className="mt-2 text-sm opacity-90">
        {video.description}
      </p>

    </div>
  );
}