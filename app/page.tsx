"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/services/videoService";
import { useVideoStore } from "./store/videoStore";

import "swiper/css";
import "swiper/css/effect-coverflow";


const OuterCarousel = dynamic(
  () => import("@/components/outer-slider/OuterCarousel"),
  {
    ssr: false,
  }
);


const VideoModal = dynamic(
  () => import("./components/modal/VideoModal"),
  {
    ssr: false,
  }
);



function HomeContent() {
  const searchParams = useSearchParams();

  const {
    data: videos,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });


  const setVideos = useVideoStore(
    (state) => state.setVideos
  );

  const openVideo = useVideoStore(
    (state) => state.openVideo
  );


  useEffect(() => {
    if (videos) {
      setVideos(videos);
    }
  }, [videos, setVideos]);


  // Open shared video from ?videoId=
  useEffect(() => {
    if (!videos) return;

    const videoId = searchParams.get("videoId");

    if (!videoId) return;


    const index = videos.findIndex(
      (video) => video.id === videoId
    );


    if (index !== -1) {
      openVideo(index);
    }

  }, [
    videos,
    searchParams,
    openVideo,
  ]);



  if (!videos) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Something went wrong.</p>;
  }


  return (
    <>
      <div className="mx-auto max-w-7xl p-6 flex items-center justify-center">
        <h1>
          Socially Approved carousel
        </h1>
      </div>


      <main className="md:p-6 md:h-screen flex items-center justify-center">
        <OuterCarousel
          videos={videos}
        />

        <VideoModal />
      </main>
    </>
  );
}



export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}