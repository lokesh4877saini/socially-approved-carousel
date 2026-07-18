import { create } from "zustand";
import { Video } from "@/types/video";

interface VideoStore {
  videos: Video[];

  currentIndex: number | null;

  isModalOpen: boolean;

  setVideos: (videos: Video[]) => void;

  openVideo: (index: number) => void;

  closeVideo: () => void;

  goToVideo: (index: number) => void;

  nextVideo: () => void;

  prevVideo: () => void;

  updateVideo: (videoId: string, updates: Partial<Video>) => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  videos: [],

  currentIndex: null,

  isModalOpen: false,

  setVideos: (videos) =>
    set({
      videos,
    }),

  openVideo: (index) =>
    set({
      currentIndex: index,
      isModalOpen: true,
    }),

  closeVideo: () =>
    set({
      isModalOpen: false,
      currentIndex: null,
    }),

  goToVideo: (index) =>
    set({
      currentIndex: index,
    }),

  updateVideo: (videoId, updates) =>
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === videoId
          ? { ...video, ...updates }
          : video
      ),
    })),

  nextVideo: () => {
    const { currentIndex, videos } = get();

    if (currentIndex === null) return;

    if (currentIndex >= videos.length - 1) return;

    set({
      currentIndex: currentIndex + 1,
    });
  },

  prevVideo: () => {
    const { currentIndex } = get();

    if (currentIndex === null) return;

    if (currentIndex <= 0) return;

    set({
      currentIndex: currentIndex - 1,
    });
  },
}));