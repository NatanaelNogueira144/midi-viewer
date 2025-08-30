import MidiFilePicker from "../../shared/MidiFilePicker";
import { Button, Container, InfoCard, InfoCardData, InfoCardTitle, MidiPickerContainer } from "./styles";
import { IMidi } from "../../../core/interfaces/midi.interface";
import { formatToTime } from "../../../utils/time-utils";
import { parseArrayBuffer } from "midi-json-parser";
import { useState } from "react";

interface PickMidiAreaProps {
    onPlayClick: (midi: IMidi) => void;
}

export default function PickMidiArea({ onPlayClick }: PickMidiAreaProps) {
    const [midiFile, setMidiFile] = useState(null as File|null);
    const [midi, setMidi] = useState(null as IMidi|null);

    return (
        <Container>
            <h1>MIDI Viewer</h1>
            <MidiPickerContainer>
                <MidiFilePicker onChange={(file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const binaryData = e.target?.result;
                        if (binaryData instanceof ArrayBuffer) {
                            parseArrayBuffer(binaryData).then(json => setMidi({...json} as IMidi));
                        }
                    };

                    reader.onerror = (e) => {
                        console.error('Error reading file:', e.target?.error);
                    };

                    reader.readAsArrayBuffer(file);
                    setMidiFile(file);
                }} />

                {midi && (
                    <>
                        <InfoCard>
                            <InfoCardTitle>Duration</InfoCardTitle>
                            <InfoCardData>
                                {formatToTime(midi.tracks[0].reduce((a, t) => a + t.delta, 0))}
                            </InfoCardData>
                        </InfoCard>
                        
                        <InfoCard>
                            <InfoCardTitle>Speed</InfoCardTitle>
                            <InfoCardData>
                                {Math.round(60000000 / midi.tracks[0].find(e => !!e.setTempo)!.setTempo!.microsecondsPerQuarter)} BPM
                            </InfoCardData>
                        </InfoCard>
                        
                        <InfoCard>
                            <InfoCardTitle>Tracks</InfoCardTitle>
                            <InfoCardData>{midi.tracks.length}</InfoCardData>
                        </InfoCard>

                        <InfoCard>
                            <InfoCardTitle>Notes</InfoCardTitle>
                            <InfoCardData>
                                {midi.tracks.map(track => track.filter(t => !!t.noteOn, 0).length).reduce((a, s) => a + s, 0)}
                            </InfoCardData>
                        </InfoCard>
                    </>
                )}

                
                {midiFile && midi && <Button onClick={() => onPlayClick(midi)}>Play Midi</Button>}
            </MidiPickerContainer>
        </Container>
    );
}