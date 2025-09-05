import { BlackKey, BlackKeyBlock, BlocksArea, Container, Keyboard, WhiteKey, WhiteKeyBlock } from "./styles";
import { INote } from "../../core/interfaces/models/note.interface";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { useEffect } from "react";

interface MIDIKeyboardProps {
    blackKeys: number[];
    currentTime: number;
    notes: INote[];
    onMidiEnd: () => void;
    size: KeyboardSize;
    totalTime: number;
    whiteKeys: number[];
}

export default function MIDIKeyboard({ 
    blackKeys,
    currentTime,
    notes,
    onMidiEnd,
    size,
    totalTime,
    whiteKeys
}: MIDIKeyboardProps) {
    useEffect(() => {
        if(currentTime > totalTime + 1000) onMidiEnd();
    }, [currentTime, notes, onMidiEnd]);

    return (
        <Container>
            <BlocksArea>
                {notes.map((note, key) => whiteKeys.includes(note.key) ? (
                    note.startsAt - currentTime > 0 - (note.endsAt - note.startsAt) 
                    && note.startsAt < currentTime + 4000 
                    && <WhiteKeyBlock
                        key={key}
                        $color={note.color}
                        $duration={note.endsAt - note.startsAt} 
                        $keyboardsize={size}
                        $position={note.startsAt - currentTime}
                        $notenumber={note.key}
                    />
                ) : (
                    note.startsAt - currentTime > 0 - (note.endsAt - note.startsAt) 
                    && note.startsAt < currentTime + 4000 
                    && <BlackKeyBlock
                        key={key}
                        $color={note.color}
                        $duration={note.endsAt - note.startsAt} 
                        $keyboardsize={size}
                        $position={note.startsAt - currentTime}
                        $notenumber={note.key}
                    />
                ))}
            </BlocksArea>
            <Keyboard>
                {whiteKeys.map((noteNumber, key) => (
                    <WhiteKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={noteNumber}
                        $pressednote={notes.find(b => b.key === noteNumber && b.startsAt < currentTime && currentTime < b.endsAt)}
                    />
                ))}
                {blackKeys.map((noteNumber, key) => (
                    <BlackKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={noteNumber}
                        $pressednote={notes.find(b => b.key === noteNumber && b.startsAt < currentTime && currentTime < b.endsAt)}
                    />
                ))}
            </Keyboard>
        </Container>
    );
}