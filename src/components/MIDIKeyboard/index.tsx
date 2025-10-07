import Soundfont from 'soundfont-player';
import {
    Block,
    BlocksArea,
    Container,
    Key,
    Keyboard,
    NoteText
} from "./styles";
import { INote } from "../../core/interfaces/models/note.interface";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { playNote } from "../../core/utils/web-audio-api";
import { useEffect } from "react";
import { range } from '../../core/utils/array-utils';
import { getNoteDuration, isNoteNatural } from '../../core/utils/note-utils';

interface MIDIKeyboardProps {
    currentTime: number;
    instruments: {[key: number]: Soundfont.Player};
    notes: INote[];
    onMidiEnd: () => void;
    showNotes: boolean;
    keyboardSize: KeyboardSize;
    totalTime: number;
}

const notesRange = {
    piano: [21, 108],
    large: [28, 103],
    medium: [36, 96],
    small: [48, 84]
};

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function MIDIKeyboard({ 
    currentTime,
    instruments,
    notes,
    onMidiEnd,
    showNotes,
    keyboardSize,
    totalTime,
}: MIDIKeyboardProps) {
    const whiteKeysIndexes = range(127).filter(note => 
        note >= notesRange[keyboardSize][0] 
        && note <= notesRange[keyboardSize][1] 
        && isNoteNatural(note)
    );

    const blackKeysIndexes = range(127).filter(note => 
        note >= notesRange[keyboardSize][0] 
        && note <= notesRange[keyboardSize][1] 
        && !isNoteNatural(note)
    );

    useEffect(() => {
        if(currentTime > totalTime + 1000) {
            onMidiEnd();
        }

        notes.filter(b => b.startsAt <= currentTime && b.startsAt + 30 >= currentTime && currentTime < b.endsAt).forEach(b => {
            playNote(instruments[b.instrument], b);
        });
    }, [currentTime, instruments, totalTime, notes, onMidiEnd]);

    return (
        <Container>
            <BlocksArea>
                {notes.map((note, key) => 
                    note.startsAt - currentTime > -getNoteDuration(note) 
                    && note.startsAt < currentTime + 4000 
                    && (
                        <Block key={key} $note={note} $currenttime={currentTime} $keyboardsize={keyboardSize}>
                            {showNotes && <NoteText>{noteNames[note.index % 12]}</NoteText>}
                        </Block>
                    )
                )}
            </BlocksArea>
            <Keyboard>
                {[...whiteKeysIndexes, ...blackKeysIndexes].map((noteIndex, key) => (
                    <Key 
                        key={key}
                        $noteindex={noteIndex}
                        $pressednote={notes.find(b => b.index === noteIndex && b.startsAt < currentTime && currentTime < b.endsAt)}
                        $keyboardsize={keyboardSize}
                    >
                        {showNotes && <NoteText>{noteNames[noteIndex % 12]}</NoteText>}
                    </Key>
                ))}
            </Keyboard>
        </Container>
    );
}