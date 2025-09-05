import MIDIList from "../MIDIList";
import MidiFilePicker from "../MIDIFilePicker";
import trackColors from "../../core/utils/track-colors";
import useAPI from "../../data/hooks/useAPI";
import { IMidi } from "../../core/interfaces/models/midi.interface";
import { INote } from "../../core/interfaces/models/note.interface";
import { MidiList } from "../../core/types/midi-list.type";
import { parseArrayBuffer } from "midi-json-parser";
import { useEffect, useState } from "react";

export default function MIDIListArea() {
    const { api } = useAPI();
    const [midis, setMidis] = useState([] as MidiList);

    useEffect(() => {
        setMidis(api.midi.list());
    }, [api]);
    
    return (
        <>
            <MidiFilePicker onChange={(file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const binaryData = e.target?.result;
                    if(binaryData instanceof ArrayBuffer) {
                        parseArrayBuffer(binaryData).then(json => {
                            let microsecondsPerQuarter = (
                                json.tracks[0].find(e => !!e.setTempo)!.setTempo as { microsecondsPerQuarter: number }
                            ).microsecondsPerQuarter;

                            setMidis([
                                ...midis, 
                                api.midi.store({
                                    name: file.name.replace('.mid', '').replace('.midi', ''),
                                    division: json.division,
                                    duration: (
                                        json.tracks[0].reduce((a, t) => a + t.delta, 0) / json.division
                                    ) * microsecondsPerQuarter / 1000,
                                    tempo: Math.round(60000000 / microsecondsPerQuarter),
                                    tracks: json.tracks.map((track, trackIndex) => {
                                        const trackPallete = trackColors[trackIndex % trackColors.length];

                                        const parseTrackNotes = () => {
                                            let time = 0;
                                            let allNotes: INote[] = [];
                                            let notesOn: INote[] = [];

                                            track.forEach(event => {
                                                time += (event.delta / json.division) * microsecondsPerQuarter / 1000;
                                                if(event.setTempo) {
                                                    let setTempo = event.setTempo as { microsecondsPerQuarter: number };
                                                    microsecondsPerQuarter = setTempo.microsecondsPerQuarter;
                                                } else if(event.noteOn) {
                                                    let noteOn = event.noteOn as { noteNumber: number; velocity: number };
                                                    notesOn.push({
                                                        key: noteOn.noteNumber,
                                                        startsAt: time,
                                                        endsAt: 0,
                                                        velocity: noteOn.velocity,
                                                        color: [0, 2, 4, 5, 7, 9, 11].includes(noteOn.noteNumber % 12) 
                                                            ? trackPallete.whiteKey
                                                            : trackPallete.blackKey
                                                    });
                                                } else if(event.noteOff) {
                                                    let noteOff = event.noteOff as { noteNumber: number; velocity: number };
                                                    let blockIndex = notesOn.findIndex(b => b.key === noteOff.noteNumber);
                                                    if (blockIndex !== -1) {
                                                        allNotes.push({ ...notesOn[blockIndex], endsAt: time});
                                                        notesOn.splice(blockIndex, 1);
                                                    }
                                                }
                                            });

                                            return allNotes;
                                        }

                                        return {
                                            name: track.find(e => !!e.trackName)?.trackName ?? 'Unnamed track',
                                            whiteKeyColor: trackPallete.whiteKey,
                                            blackKeyColor: trackPallete.blackKey,
                                            textColor: trackPallete.textColor,
                                            isMuted: false,
                                            notes: parseTrackNotes()
                                        };
                                    })
                                } as IMidi)
                            ]);
                        });
                    }
                };

                reader.onerror = (e) => {
                    console.error('Error reading file:', e.target?.error);
                };

                reader.readAsArrayBuffer(file);
            }} />

            <MIDIList midis={midis} setMidis={setMidis} />
        </>
    );
}