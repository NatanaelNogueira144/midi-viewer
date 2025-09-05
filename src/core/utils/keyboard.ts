import { IKeyboard } from "../interfaces/models/keyboard.interface";
import { range } from "./array-utils";

const keyboard = {
    piano: {
        whiteKeyNotes: range(127).filter((note) => note >= 21 && note <= 108 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 21 && note <= 108 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    large: {
        whiteKeyNotes: range(127).filter((note) => note >= 28 && note <= 103 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 28 && note <= 103 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    medium: {
        whiteKeyNotes: range(127).filter((note) => note >= 36 && note <= 96 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 36 && note <= 96 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    small: {
        whiteKeyNotes: range(127).filter((note) => note >= 48 && note <= 84 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 48 && note <= 84 && [1, 3, 6, 8, 10].includes(note % 12))
    }
} as IKeyboard;

export default keyboard;