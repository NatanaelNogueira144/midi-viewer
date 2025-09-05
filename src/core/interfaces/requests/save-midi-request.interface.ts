import { ITrack } from "../models/track.interface";

export interface ISaveMidiRequest {
    name: string;
    division: number;
    tracks: ITrack[];
}