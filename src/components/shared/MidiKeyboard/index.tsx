import { BlackKey, BlackKeyBlock, BlocksArea, Container, Keyboard, WhiteKey, WhiteKeyBlock } from "./styles";
import { IBlock } from "../../../core/interfaces/block.interface";
import { KeyboardSize } from "../../../core/types/keyboard-size.type";
import { useEffect } from "react";

interface MidiKeyboardProps {
    blackKeys: number[];
    blocks: IBlock[];
    currentTime: number;
    onMidiEnd: () => void;
    size: KeyboardSize;
    whiteKeys: number[];
}

export default function MidiKeyboard({ 
    blackKeys,
    blocks,
    currentTime,
    onMidiEnd ,
    size,
    whiteKeys
}: MidiKeyboardProps) {
    useEffect(() => {
        if(currentTime > blocks[blocks.length - 1].endsAt + 1000) onMidiEnd();
    }, [currentTime, blocks, onMidiEnd]);

    return (
        <Container>
            <BlocksArea>
                {blocks.map((block, key) => whiteKeys.includes(block.key) ? (
                    block.startsAt - currentTime > 0 - (block.endsAt - block.startsAt) 
                    && block.startsAt < currentTime + 3200 
                    && <WhiteKeyBlock
                        key={key}
                        $color={block.color}
                        $duration={block.endsAt - block.startsAt} 
                        $keyboardsize={size}
                        $position={block.startsAt - currentTime}
                        $notenumber={block.key}
                    />
                ) : (
                    block.startsAt - currentTime > 0 - (block.endsAt - block.startsAt) 
                    && block.startsAt < currentTime + 3200 
                    && <BlackKeyBlock
                        key={key}
                        $color={block.color}
                        $duration={block.endsAt - block.startsAt} 
                        $keyboardsize={size}
                        $position={block.startsAt - currentTime}
                        $notenumber={block.key}
                    />
                ))}
            </BlocksArea>
            <Keyboard>
                {whiteKeys.map((note, key) => (
                    <WhiteKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={note}
                        $pressedblock={blocks.find(b => b.key === note && b.startsAt < currentTime && currentTime < b.endsAt)}
                    />
                ))}
                {blackKeys.map((note, key) => (
                    <BlackKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={note}
                        $pressedblock={blocks.find(b => b.key === note && b.startsAt < currentTime && currentTime < b.endsAt)}
                    />
                ))}
            </Keyboard>
        </Container>
    );
}