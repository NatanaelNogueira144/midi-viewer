import { IKeyboard } from "../core/interfaces/keyboard.interface";
import { range } from "../utils/array-utils";

const keyboard = {
    piano: {
        whiteKeyNotes: range(127).filter((note) => note >= 21 && note <= 108 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 21 && note <= 108 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    large: {
        whiteKeyNotes: range(127).filter((note) => note >= 40 && note <= 115 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 40 && note <= 115 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    medium: {
        whiteKeyNotes: range(127).filter((note) => note >= 48 && note <= 108 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 48 && note <= 108 && [1, 3, 6, 8, 10].includes(note % 12))
    },
    small: {
        whiteKeyNotes: range(127).filter((note) => note >= 60 && note <= 96 && [0, 2, 4, 5, 7, 9, 11].includes(note % 12)),
        blackKeyNotes: range(127).filter((note) => note >= 60 && note <= 96 && [1, 3, 6, 8, 10].includes(note % 12))
    }
} as IKeyboard;

export default keyboard;