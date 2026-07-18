import { Video } from "./video";

export interface ActionResult {
  success: boolean;
  message: string;
  video: Video | null;
}