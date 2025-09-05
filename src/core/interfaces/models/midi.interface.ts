import { ITrack } from "./track.interface";

export interface IMidi {
    name: string;
    division: number;
    duration: number;
    tempo: number;
    tracks: ITrack[];
}