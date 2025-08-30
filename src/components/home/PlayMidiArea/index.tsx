import MidiKeyboard from "../../shared/MidiKeyboard";
import keyboard from "../../../data/keyboard";
import trackColors from "../../../data/track-colors";
import { Container } from "./styles";
import { IBlock } from "../../../core/interfaces/block.interface";
import { IMidi } from "../../../core/interfaces/midi.interface";
import { ITrackPallete } from "../../../core/interfaces/track-pallete.interface";
import { useEffect, useRef, useState } from "react";

interface PlayMidiAreaProps {
    onMidiEnd: () => void;
    midi: IMidi;
}

export default function PlayMidiArea({ midi, onMidiEnd }: PlayMidiAreaProps) {
    const [currentTime, setCurrentTime] = useState(-2000);
    const [blocks, setBlocks] = useState([] as IBlock[]);
    const intervalRef = useRef(undefined as undefined|NodeJS.Timer);

    useEffect(() => {
        function getKeyColor(noteNumber: number, trackColors: ITrackPallete[], i: number): string {
            const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
            const colorSet = trackColors[i % trackColors.length];
            return whiteKeys.includes(noteNumber % 12) ? colorSet.whiteKey : colorSet.blackKey;
        }

        function parseMidiTracks(midi: IMidi, trackColors: ITrackPallete[]): IBlock[] {
            let allBlocks: IBlock[] = [];
            let tempo = 0;

            midi.tracks.forEach((events, i) => {
                let time = 0;
                let blocksOn: IBlock[] = [];

                events.forEach(event => {
                    time += (event.delta / midi.division) * tempo / 1000;
                    if (event.setTempo) {
                        tempo = event.setTempo.microsecondsPerQuarter;
                    } else if (event.noteOn) {
                        blocksOn.push({
                            key: event.noteOn.noteNumber,
                            color: getKeyColor(event.noteOn.noteNumber, trackColors, i),
                            startsAt: time,
                            endsAt: 0
                        });
                    } else if (event.noteOff) {
                        let blockIndex = blocksOn.findIndex(b => b.key === event.noteOff!.noteNumber);
                        if (blockIndex !== -1) {
                            allBlocks.push({ ...blocksOn[blockIndex], endsAt: time});
                            blocksOn.splice(blockIndex, 1);
                        }
                    }
                });
            });
            return allBlocks;
        }

        setBlocks(parseMidiTracks(midi, trackColors));

        intervalRef.current = setInterval(() => {
            setCurrentTime(prevTime => prevTime + 37);
        }, 37);

        return () => clearInterval(intervalRef.current);
    }, [midi, trackColors]);

    return (
        <Container>
            {blocks.length > 0 && (
                <MidiKeyboard 
                    blackKeys={keyboard.piano.blackKeyNotes}
                    blocks={blocks}
                    currentTime={currentTime}
                    onMidiEnd={onMidiEnd}
                    size="piano"
                    whiteKeys={keyboard.piano.whiteKeyNotes}
                />
            )}
        </Container>
    );
}