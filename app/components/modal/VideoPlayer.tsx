"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    LoaderCircle,
} from "lucide-react";

import { Video } from "@/types/video";
import VideoActions from "./VideoActions";
import VideoInfo from "./VideoInfo";
import { useIntersectionVideo } from "@/hooks/useIntersectionVideo";

interface Props {
    video: Video;
    isActive: boolean;
    shouldRenderVideo: boolean;
}

export default function VideoPlayer({
    video,
    isActive,
    shouldRenderVideo
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useIntersectionVideo(videoRef, isActive);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const [loading, setLoading] = useState(true);

    const [progress, setProgress] = useState(0);

    // let we are doing play and pause
    useEffect(() => {
        const el = videoRef.current;

        if (!el) return;

        if (!isActive) {
            el.pause();
            setPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        const el = videoRef.current;

        if (!el) return;

        if (el.paused) {
            el.play();
            setPlaying(true);
        } else {
            el.pause();
            setPlaying(false);
        }
    };

    const toggleMute = () => {
        const el = videoRef.current;

        if (!el) return;

        el.muted = !el.muted;

        setMuted(el.muted);
    };

    const handleProgress = () => {
        const el = videoRef.current;

        if (!el || !el.duration) return;

        setProgress((el.currentTime / el.duration) * 100);
    };

    if (!shouldRenderVideo) {
        return (
            <div className="aspect-[9/16] h-[90vh] overflow-hidden rounded-2xl">
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div className="aspect-[9/16] h-[90vh] w-full lg:w-[350px] overflow-hidden rounded-2xl bg-black">

            <video
                ref={videoRef}
                src={video.videoUrl}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted={muted}
                playsInline
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onLoadedData={() => setLoading(false)}
                onTimeUpdate={handleProgress}
            />

            {/* Loading */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <LoaderCircle className="h-10 w-10 animate-spin text-white" />
                </div>
            )}

            {/* Progress */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-white/20">
                <div
                    className="h-full bg-white transition-all"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            {/* Center Play/Pause */}
            <button
                onClick={togglePlay}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 p-4 text-white backdrop-blur cursor-pointer"
            >
                {playing ? (
                    <Pause size={32} />
                ) : (
                    <Play size={32} fill="white" />
                )}
            </button>

            {/* Mute */}
            <button
                onClick={toggleMute}
                className="absolute md:right-4 md:top-4 rounded-full bg-black/40 p-2 text-white cursor-pointer"
            >
                {muted ? (
                    <VolumeX />
                ) : (
                    <Volume2 />
                )}
            </button>

            <VideoActions video={video} />

            <VideoInfo video={video} />
        </div>
    );
}