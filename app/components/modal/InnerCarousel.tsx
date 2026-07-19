"use client";

import { Video } from "@/types/video";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    EffectCoverflow,
    Keyboard,
    Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import VideoPlayer from "./VideoPlayer";
import { useVideoStore } from "@/store/videoStore";

interface Props {
    videos: Video[];
    initialIndex: number;
}

export default function InnerCarousel({
    videos,
    initialIndex,
}: Props) {
    const { currentIndex, goToVideo } = useVideoStore();
    const activeIndex = currentIndex ?? initialIndex;
    return (
        <Swiper
            effect="coverflow"
            direction="horizontal"
            centeredSlides={true}
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
                    slidesPerView: 4,
                    spaceBetween: 0,
                },
            }}
            initialSlide={initialIndex}
            mousewheel
            keyboard
            grabCursor
            modules={[
                EffectCoverflow,
                Keyboard,
                Mousewheel,
            ]}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 220,
                modifier: 1,
                scale: 0.8,
                slideShadows: false,
            }}
            onSlideChange={(swiper) => goToVideo(swiper.activeIndex)}
            className="relative aspect-[9/16] h-[90vh] rounded-2xl  w-screen"
        >
            {videos.map((video, index) => {

                const shouldRenderVideo =
                    Math.abs(activeIndex - index) <= 4;

                return (
                    <SwiperSlide key={video.id}>
                        <VideoPlayer
                            video={video}
                            isActive={activeIndex === index}
                            shouldRenderVideo={shouldRenderVideo}
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}