import styled from "styled-components";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { INote } from "../../core/interfaces/models/note.interface";

const size = 1.1;

const whiteKeyWidth = 23 * size;
const blackKeyWidth = 14 * size;
const whiteKeyHeight = 150 * size;
const blackKeyHeight = 90 * size;

const whiteBlockKeyWidth = 23 * size;
const blackBlockKeyWidth = 14 * size;

const sizeOffsets = { 
    piano: whiteKeyWidth * -12, 
    large: whiteKeyWidth * -16, 
    medium: whiteKeyWidth * -21, 
    small: whiteKeyWidth * -28
};

export const Container = styled.div`
    grid-area: player;
    position: relative;
    overflow-x: hidden;
    background-color: #000000;
    color: #FFFFFF;
`;

export const BlocksArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

export const Keyboard = styled.div`
    position: absolute;
    bottom: 0;
`;

interface KeyProps {
    $notenumber: number;
    $keyboardsize: KeyboardSize;
    $pressednote: INote|undefined;
}

function whiteKeyOffset(keyboardSize: KeyboardSize, noteNumber: number) {
    const octNote = noteNumber % 12;
    const sizeOffset = sizeOffsets[keyboardSize] || 0;

    const extraWhiteKeys = [2, 4, 5, 7, 9, 11];
    const extraOffset = extraWhiteKeys.filter(i => octNote >= i).length * whiteKeyWidth;

    return Math.floor(noteNumber / 12) * whiteKeyWidth * 7 + sizeOffset + extraOffset;
}

export const WhiteKey = styled.div.attrs<KeyProps>(props => ({
    style: {
        width: whiteKeyWidth,
        height: whiteKeyHeight,
        left: `${whiteKeyOffset(props.$keyboardsize, props.$notenumber)}px`,
        backgroundColor: props.$pressednote ? props.$pressednote.color : '#FFFFFF',
        boxShadow: props.$pressednote 
            ? `-8px -20px 10px white, 8px -20px 10px white, 0 -50px 50px ${props.$pressednote.color}` 
            : 'none'
    }
}))`
    position: absolute;
    bottom: 0;
    border: 1px solid #444;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    z-index: 1;
    
    span {
        font-size: ${whiteKeyWidth * 0.8}px;
        color: #000;
    }
`;

function blackKeyOffset(keyboardSize: KeyboardSize, noteNumber: number) {
    const octNote = noteNumber % 12;
    const sizeOffset = sizeOffsets[keyboardSize] || 0;

    const conditions = [
        { condition: octNote >= 3, value: whiteKeyWidth * 1.1 },
        { condition: octNote >= 6, value: whiteKeyWidth * 1.83 },
        { condition: octNote >= 8, value: whiteKeyWidth * 1.1 },
        { condition: octNote >= 10, value: whiteKeyWidth * 1.1 }
    ];

    const extraOffset = conditions.reduce(
        (acc, curr) => acc + (curr.condition ? curr.value : 0),
        0
    ) + (whiteKeyWidth * 0.65);

    return Math.floor(noteNumber / 12) * whiteKeyWidth * 7 + sizeOffset + extraOffset;
}

export const BlackKey = styled.div.attrs<KeyProps>(props => ({
    style: {
        width: blackKeyWidth,
        height: blackKeyHeight,
        left: `${blackKeyOffset(props.$keyboardsize, props.$notenumber)}px`,
        bottom: whiteKeyHeight - blackKeyHeight,
        backgroundColor: props.$pressednote ? props.$pressednote.color : '#000000',
        boxShadow: props.$pressednote 
            ? `-5px -15px 10px white, 5px -15px 10px white, 0 -30px 30px ${props.$pressednote.color}` 
            : 'none'
    }
}))`
    position: absolute;
    border: 1px solid #444;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    z-index: 2;

    span {
        font-size: ${blackKeyWidth * 0.8}px;
    }
`;

interface BlockProps {
    $keyboardsize: KeyboardSize;
    $notenumber: number;
    $duration: number;
    $position: number;
    $color: string;
}

export const Block = styled.div.attrs<BlockProps>(props => ({
    style: {
        bottom: `${whiteKeyHeight + (props.$position / 5)}px`,
        height: `${props.$duration / 5}px`,
        backgroundColor: props.$color
    }
}))`
    position: absolute;
    border-radius: 5px;
    z-index: 1;
`;

export const WhiteKeyBlock = styled(Block).attrs<BlockProps>(props => ({
    style: {
        width: whiteBlockKeyWidth,
        left: `${whiteKeyOffset(props.$keyboardsize, props.$notenumber)}px`,
        minHeight: whiteBlockKeyWidth * 0.8
    }
}))`
    span {
        font-size: ${whiteBlockKeyWidth * 0.8}px;
    }
`;

export const BlackKeyBlock = styled(Block).attrs<BlockProps>(props => ({
    style: {
        width: blackBlockKeyWidth,
        left: `${blackKeyOffset(props.$keyboardsize, props.$notenumber)}px`,
        minHeight: blackBlockKeyWidth * 0.8
    }
}))`
    span {
        font-size: ${blackBlockKeyWidth * 0.8}px;
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