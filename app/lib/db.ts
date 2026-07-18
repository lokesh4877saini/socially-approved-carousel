import videos from "@/data/dummy.json";
import { Video } from "@/types/video";

const db: Video[] = [...videos];

/**
 * Prevent duplicate likes
 * videoId -> Set<user/IP>
 */
const likedUsers = new Map<string, Set<string>>();

/**
 * Store share history
 */
const shareHistory: {
    videoId: string;
    user: string;
    platform: string;
    sharedAt: Date;
}[] = [];

export const getVideos = () => db;

export const likeVideo = (videoId: string, user: string) => {
    const video = db.find((v) => v.id === videoId);

    if (!video) return null;

    let users = likedUsers.get(videoId);

    if (!users) {
        users = new Set<string>();
        likedUsers.set(videoId, users);
    }

    // Already liked
    if (users.has(user)) {
        return video;
    }

    users.add(user);
    video.likes++;

    return video;
};

export const shareVideo = (
    videoId: string,
    user: string,
    platform: string
) => {
    const video = db.find((v) => v.id === videoId);

    if (!video) return null;

    video.shares++;

    shareHistory.push({
        videoId,
        user,
        platform,
        sharedAt: new Date(),
    });

    return video;
};

export const getShareHistory = () => shareHistory;