import { Track } from "./track.models";

export interface Playlist {
  _id?: string;
  title: string;
  description: string;
  cover: string;
  tracks?: Track[];
}