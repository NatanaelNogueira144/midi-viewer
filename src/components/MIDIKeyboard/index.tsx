import Soundfont from 'soundfont-player';
import noteNames from "../../core/utils/music-utils";
import { BlackKey, BlackKeyBlock, BlocksArea, Container, Keyboard, NoteText, WhiteKey, WhiteKeyBlock } from "./styles";
import { INote } from "../../core/interfaces/models/note.interface";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { playNote } from "../../core/utils/web-audio-api";
import { useEffect } from "react";

interface MIDIKeyboardProps {
    blackKeys: number[];
    currentTime: number;
    instruments: {[key: number]: Soundfont.Player};
    notes: INote[];
    onMidiEnd: () => void;
    showNotes: boolean;
    size: KeyboardSize;
    totalTime: number;
    whiteKeys: number[];
}

export default function MIDIKeyboard({ 
    blackKeys,
    currentTime,
    instruments,
    notes,
    onMidiEnd,
    showNotes,
    size,
    totalTime,
    whiteKeys
}: MIDIKeyboardProps) {
    useEffect(() => {
        if(currentTime > totalTime + 1000) {
            onMidiEnd();
        }

        notes.filter(b => b.startsAt < currentTime && b.startsAt + 37 > currentTime && currentTime < b.endsAt).forEach(b => {
            playNote(instruments[b.instrument], b);
        });
    }, [currentTime, instruments, totalTime, notes, onMidiEnd]);

    return (
        <Container>
            <BlocksArea>
                {notes.map((note, key) => whiteKeys.includes(note.key) ? (
                    note.startsAt - currentTime > 0 - (note.endsAt - note.startsAt) 
                    && note.startsAt < currentTime + 4000 
                    && (
                        <WhiteKeyBlock
                            key={key}
                            $color={note.color}
                            $duration={note.endsAt - note.startsAt} 
                            $keyboardsize={size}
                            $position={note.startsAt - currentTime}
                            $notenumber={note.key}
                        >
                            {showNotes && <NoteText>{noteNames[note.key % 12]}</NoteText>}
                        </WhiteKeyBlock>
                    )
                ) : (
                    note.startsAt - currentTime > 0 - (note.endsAt - note.startsAt) 
                    && note.startsAt < currentTime + 4000 
                    && (
                        <BlackKeyBlock
                            key={key}
                            $color={note.color}
                            $duration={note.endsAt - note.startsAt} 
                            $keyboardsize={size}
                            $position={note.startsAt - currentTime}
                            $notenumber={note.key}
                        >
                            {showNotes && <NoteText>{noteNames[note.key % 12]}</NoteText>}
                        </BlackKeyBlock>
                    )
                ))}
            </BlocksArea>
            <Keyboard>
                {whiteKeys.map((noteNumber, key) => (
                    <WhiteKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={noteNumber}
                        $pressednote={notes.find(b => b.key === noteNumber && b.startsAt < currentTime && currentTime < b.endsAt)}
                    >
                        {showNotes && <NoteText>{noteNames[noteNumber % 12]}</NoteText>}
                    </WhiteKey>
                ))}
                {blackKeys.map((noteNumber, key) => (
                    <BlackKey 
                        key={key}
                        $keyboardsize={size}
                        $notenumber={noteNumber}
                        $pressednote={notes.find(b => b.key === noteNumber && b.startsAt < currentTime && currentTime < b.endsAt)}
                    >
                        {showNotes && <NoteText>{noteNames[noteNumber % 12]}</NoteText>}
                    </BlackKey>
                ))}
            </Keyboard>
        </Container>
    );
}