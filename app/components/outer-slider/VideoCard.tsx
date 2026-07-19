import Image from "next/image";
import { Video } from "@/types/video";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({
  video,
  onClick,
}: VideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group aspect-[9/16] w-full  overflow-hidden rounded-xl bg-red-400"
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        sizes="100%"
        className="object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition duration-300 group-hover:scale-110">
          <Play
            className="ml-1 h-7 w-7 fill-black text-black"
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
        <h3 className="text-sm font-semibold text-white">
          {video.title}
        </h3>
      </div>
    </button>
  );
}