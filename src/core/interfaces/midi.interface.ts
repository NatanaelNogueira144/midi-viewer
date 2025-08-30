import { IMidiEvent } from "./midi-event.interface";

export interface IMidi {
    division: number;
    tracks: IMidiEvent[][];
}