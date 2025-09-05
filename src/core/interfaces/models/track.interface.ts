import { INote } from "./note.interface";

export interface ITrack {
    name: string;
    whiteKeyColor: string;
    blackKeyColor: string;
    textColor: string;
    isMuted: boolean;
    notes: INote[];
}