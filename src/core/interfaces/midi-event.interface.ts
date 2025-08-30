export interface IMidiEvent {
    noteOn?: {
        noteNumber: number;
        velocity: number;
    };
    noteOff?: {
        noteNumber: number;
        velocity: number;
    };
    setTempo?: {
        microsecondsPerQuarter: number;
    };
    delta: number;
}