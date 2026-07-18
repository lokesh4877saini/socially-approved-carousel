export interface Video {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: number;
  
    likes: number;
    liked?: boolean;
    shares: number;
    comments: number;
  }