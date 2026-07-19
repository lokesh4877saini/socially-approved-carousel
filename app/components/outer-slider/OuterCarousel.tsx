"use client";

import { Video } from "@/types/video";
import VideoCard from "./VideoCard";
import { useVideoStore } from "@/store/videoStore";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import useWindow from "@/hooks/useWindow";

interface Props {
  videos: Video[];
}
export default function OuterCarousel({ videos }: Props) {
  const openVideo = useVideoStore((state) => state.openVideo);
  const {isMobile} = useWindow();
  // console.log(isMobile)
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      centeredSlides={isMobile}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
 
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video.id}>
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => { openVideo(index); console.log(video.id); }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}