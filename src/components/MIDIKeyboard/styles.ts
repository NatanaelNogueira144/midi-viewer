import styled from "styled-components";
import { INote } from "../../core/interfaces/models/note.interface";
import { getNoteDuration, isNoteNatural } from "../../core/utils/note-utils";
import { KeyboardSize } from "../../core/types/keyboard-size.type";

const whiteKeysAmount = { 
    piano: 52, 
    large: 45, 
    medium: 36, 
    small: 22
};

const whiteKeyWidth = (keyboardSize: KeyboardSize) => `100vw / ${whiteKeysAmount[keyboardSize]}`;
const whiteKeyHeight = (keyboardSize: KeyboardSize) => `(${whiteKeyWidth(keyboardSize)}) * 6.5`;
const blackKeyWidth = (keyboardSize: KeyboardSize) => `(${whiteKeyWidth(keyboardSize)}) / 1.64`;
const blackKeyHeight = (keyboardSize: KeyboardSize) => `(${whiteKeyHeight(keyboardSize)}) / 1.64`;

const whiteKeyBoxShadow = (keyboardSize: KeyboardSize) => 
    `calc((${whiteKeyWidth(keyboardSize)}) / -2.87) calc((${whiteKeyWidth(keyboardSize)}) / -1.15) calc((${whiteKeyWidth(keyboardSize)}) / 2.3) white, `
    + `calc((${whiteKeyWidth(keyboardSize)}) / 2.87) calc((${whiteKeyWidth(keyboardSize)}) / -1.15) calc((${whiteKeyWidth(keyboardSize)}) / 2.3) white, ` 
    + `0 calc((${whiteKeyWidth(keyboardSize)}) / -0.46) calc((${whiteKeyWidth(keyboardSize)}) / 0.46)`;

const blackKeyBoxShadow = (keyboardSize: KeyboardSize) => 
    `calc((${whiteKeyWidth(keyboardSize)}) / -4.6) calc((${whiteKeyWidth(keyboardSize)}) / -1.53) calc((${whiteKeyWidth(keyboardSize)}) / 2.3) white, `
    + `calc((${whiteKeyWidth(keyboardSize)}) / 4.6) calc((${whiteKeyWidth(keyboardSize)}) / -1.53) calc((${whiteKeyWidth(keyboardSize)}) / 2.3) white, ` 
    + `0 calc((${whiteKeyWidth(keyboardSize)}) / -0.76) calc((${whiteKeyWidth(keyboardSize)}) / 0.76)`;

function keyOffset(noteIndex: number, keyboardSize: KeyboardSize) {
    const octaveNote = noteIndex % 12;
    const extraWhiteKeys = [2, 4, 5, 7, 9, 11];
    const sizeOffsets = { 
        piano: `(${whiteKeyWidth(keyboardSize)}) * 12`, 
        large: `(${whiteKeyWidth(keyboardSize)}) * 16`, 
        medium: `(${whiteKeyWidth(keyboardSize)}) * 21`, 
        small: `(${whiteKeyWidth(keyboardSize)}) * 28`
    };
    const conditions = [
        { condition: octaveNote >= 3, value: 1.1 },
        { condition: octaveNote >= 6, value: 1.83 },
        { condition: octaveNote >= 8, value: 1.1 },
        { condition: octaveNote >= 10, value: 1.1 }
    ];

    const extraOffset = isNoteNatural(noteIndex) 
        ? `${extraWhiteKeys.filter(i => octaveNote >= i).length} * ${whiteKeyWidth(keyboardSize)}`
        : `(${whiteKeyWidth(keyboardSize)}) * (0.65 + ${conditions.reduce((acc, curr) => acc + (curr.condition ? curr.value : 0), 0)})`;

    return `calc((${whiteKeyWidth(keyboardSize)}) * ${Math.floor(noteIndex / 12)} * 7 + (${extraOffset}) - (${sizeOffsets[keyboardSize]}))`;
}

export const Container = styled.div`
    grid-area: player;
    position: relative;
    overflow: hidden;
    background-color: #000000;
    color: #FFFFFF;
`;

export const BlocksArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

interface BlockProps {
    $note: INote;
    $currenttime: number;
    $keyboardsize: KeyboardSize;
}

export const Block = styled.div.attrs<BlockProps>(({ $note, $currenttime, $keyboardsize }) => ({
    style: {
        bottom: `calc((${whiteKeyHeight($keyboardsize)}) + ${($note.startsAt - $currenttime) / 5}px)`,
        left: keyOffset($note.index, $keyboardsize),
        height: `${getNoteDuration($note) / 5}px`,
        minHeight: `calc((${isNoteNatural($note.index) ? whiteKeyWidth($keyboardsize) : blackKeyWidth($keyboardsize)}) * 0.8)`,
        width: `calc(${isNoteNatural($note.index) ? whiteKeyWidth($keyboardsize) : blackKeyWidth($keyboardsize)})`,
        borderRadius: `calc((${whiteKeyWidth($keyboardsize)}) / 5)`,
        backgroundColor: $note.color,
        boxShadow: `inset 0 0 3px ${$note.color}, inset 0 0 3px black`
    }
}))`
    position: absolute;
    border-radius: 5px;
    z-index: 1;

    span {
        font-size: ${({ $note, $keyboardsize }) => `calc((${isNoteNatural($note.index) ? whiteKeyWidth($keyboardsize) : blackKeyWidth($keyboardsize)}) * 0.8)`};
        color: ${({ $note }) => $note.textColor};
    }
`;

export const Keyboard = styled.div`
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
`;

interface KeyProps {
    $noteindex: number;
    $pressednote: INote|undefined;
    $keyboardsize: KeyboardSize;
}

export const Key = styled.div.attrs<KeyProps>(({ $noteindex, $pressednote, $keyboardsize }) => ({
    style: {
        width: `calc(${isNoteNatural($noteindex) ? whiteKeyWidth($keyboardsize) : blackKeyWidth($keyboardsize)})`,
        height: `calc(${isNoteNatural($noteindex) ? whiteKeyHeight($keyboardsize) : blackKeyHeight($keyboardsize)})`,
        left: keyOffset($noteindex, $keyboardsize),
        bottom: isNoteNatural($noteindex) ? 0 : `calc((${whiteKeyHeight($keyboardsize)}) - (${blackKeyHeight($keyboardsize)}))`,
        borderBottomLeftRadius: `calc((${whiteKeyWidth($keyboardsize)}) / 7.6)`,
        borderBottomRightRadius: `calc((${whiteKeyWidth($keyboardsize)}) / 7.6)`,
        backgroundColor: $pressednote ? $pressednote.color : (isNoteNatural($noteindex) ? '#FFF' : '#000'),
        boxShadow: isNoteNatural($noteindex) 
            ? `inset 0 0 1px black${$pressednote ? `, ${whiteKeyBoxShadow($keyboardsize)} ${$pressednote.color}` : ''}`
            : `inset 0 0 1px white${$pressednote ? `, ${blackKeyBoxShadow($keyboardsize)} ${$pressednote.color}` : ''}`
    }
}))`
    position: absolute;
    z-index: ${({ $noteindex }) => isNoteNatural($noteindex) ? 1 : 2};
    
    span {
        font-size: ${({ $noteindex, $keyboardsize }) => `calc((${isNoteNatural($noteindex) ? whiteKeyWidth($keyboardsize) : blackKeyWidth($keyboardsize)}) * 0.8)`};
        color: ${({ $noteindex }) => isNoteNatural($noteindex) ? '#000' : '#FFF'};
    }
`;

export const NoteText = styled.span`
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    font-weight: 600;
`;