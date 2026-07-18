"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { useVideoStore } from "@/store/videoStore";

import InnerCarousel from "./InnerCarousel";

export default function VideoModal() {
  const {
    videos,
    currentIndex,
    isModalOpen,
    closeVideo,
  } = useVideoStore();

  if (!isModalOpen || currentIndex === null) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: .95 }}
          animate={{ scale: 1 }}
          exit={{ scale: .95 }}
          transition={{ duration: .2 }}
          className="relative h-[90vh] bg-transparent  rounded-2xl "
        >
          <button
            onClick={closeVideo}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/40 p-2 text-white"
          >
            <X size={20} />
          </button>

          <InnerCarousel
            videos={videos}
            initialIndex={currentIndex}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}