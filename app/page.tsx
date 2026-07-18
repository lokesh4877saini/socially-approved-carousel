"use client";

import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/services/videoService";
import OuterCarousel from "@/components/outer-slider/OuterCarousel";
import { useVideoStore } from "./store/videoStore";
import { useEffect } from "react";
import VideoModal from "./components/modal/VideoModal";
import "swiper/css";
import "swiper/css/effect-coverflow";
export default function Home() {
  const { data: videos, isLoading, error } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
  const setVideos = useVideoStore((state) => state.setVideos);
  useEffect(() => {
    if (videos) {
      setVideos(videos);
    }
  }, [videos, setVideos])

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <div className="mx-auto max-w-7xl p-6 flex items-center justify-center">
      <h1>Socially Approved carousel</h1>
      </div>
      <main className="mx-auto max-w-7xl p-6 h-screen flex items-center justify-center">
        <>
        <OuterCarousel videos={videos ?? []} />
        <VideoModal />
        </>
      </main>
    </>
  );
}