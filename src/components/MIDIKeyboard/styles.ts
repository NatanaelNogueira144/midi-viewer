import styled from "styled-components";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { INote } from "../../core/interfaces/models/note.interface";

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
    const sizeOffsets = { piano: -276, large: -368, medium: -483, small: -644 };
    const octNote = noteNumber % 12;
    const sizeOffset = sizeOffsets[keyboardSize] || 0;

    const extraWhiteKeys = [2, 4, 5, 7, 9, 11];
    const extraOffset = extraWhiteKeys.filter(i => octNote >= i).length * 23;

    return Math.floor(noteNumber / 12) * 23 * 7 + sizeOffset + extraOffset;
}

export const WhiteKey = styled.div.attrs<KeyProps>(props => ({
    style: {
        left: `${whiteKeyOffset(props.$keyboardsize, props.$notenumber)}px`,
        backgroundColor: props.$pressednote ? props.$pressednote.color : '#FFFFFF',
        boxShadow: props.$pressednote 
            ? `-8px -20px 10px white, 8px -20px 10px white, 0 -50px 50px ${props.$pressednote.color}` 
            : 'none'
    }
}))`
    position: absolute;
    bottom: 0;
    width: 23px;
    height: 150px;
    border: 1px solid gray;
    z-index: 1;
`;

function blackKeyOffset(keyboardSize: KeyboardSize, noteNumber: number) {
    const offsets = { piano: -276, large: -368, medium: -483, small: -644 };
    const octNote = noteNumber % 12;
    const sizeOffset = offsets[keyboardSize] || 0;

    const conditions = [
        { condition: octNote >= 3, value: 25 },
        { condition: octNote >= 6, value: 43 },
        { condition: octNote >= 8, value: 25 },
        { condition: octNote >= 10, value: 25 }
    ];

    const extraOffset = conditions.reduce(
        (acc, curr) => acc + (curr.condition ? curr.value : 0),
        0
    );

    return Math.floor(noteNumber / 12) * 23 * 7 + sizeOffset + extraOffset;
}

export const BlackKey = styled.div.attrs<KeyProps>(props => ({
    style: {
        left: `${blackKeyOffset(props.$keyboardsize, props.$notenumber) + 15}px`,
        backgroundColor: props.$pressednote ? props.$pressednote.color : '#000000',
        boxShadow: props.$pressednote 
            ? `-5px -15px 10px white, 5px -15px 10px white, 0 -30px 30px ${props.$pressednote.color}` 
            : 'none'
    }
}))`
    position: absolute;
    bottom: 60px;
    width: 14px;
    height: 90px;
    border: 1px solid gray;
    z-index: 2;
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
        bottom: `${150 + (props.$position / 5)}px`,
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
        left: `${whiteKeyOffset(props.$keyboardsize, props.$notenumber)}px`
    }
}))`
    width: 23px;
`;

export const BlackKeyBlock = styled(Block).attrs<BlockProps>(props => ({
    style: {
        left: `${blackKeyOffset(props.$keyboardsize, props.$notenumber) + 15}px`
    }
}))`
    width: 14px;
`;