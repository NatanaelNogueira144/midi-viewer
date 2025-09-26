import { INote } from "../interfaces/models/note.interface";

export function getNoteDuration(note: INote): number {
    return note.endsAt - note.startsAt;
}

export function isNoteNatural(noteIndex: number): boolean {
    return [0, 2, 4, 5, 7, 9, 11].includes(noteIndex % 12);
}