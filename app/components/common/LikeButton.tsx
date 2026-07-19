"use client";

import { Heart } from "lucide-react";

interface Props {
  likes: number;
  liked: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export default function LikeButton({
  likes,
  liked,
  isLoading = false,
  onClick,
}: Props) {
  // console.log(liked,"already?")
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex flex-col items-center gap-2 rounded-full bg-transparent px-4 py-2 text-white transition disabled:opacity-50 cursor-pointer"
    >
      <Heart
        className={`h-5 w-5 transition hover:text-red-500 hover:fill-red-500  ${
          liked ? "fill-red-500 text-red-500" : "fill-transparent"
        }`}
      />

      <p>{likes}</p>
    </button>
  );
}