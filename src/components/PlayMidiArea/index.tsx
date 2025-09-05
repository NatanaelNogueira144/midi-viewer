import Button from "../Button";
import MidiContext from "../../data/contexts/MidiContext";
import MidiKeyboard from "../MIDIKeyboard";
import RoutesContext from "../../data/contexts/RoutesContext";
import keyboard from "../../core/utils/keyboard";
import useAPI from "../../data/hooks/useAPI";
import { Container, Header, ProgressBar, ProgressBarFill, TimeController, TimeControllersContainer } from "./styles";
import { useContext, useEffect, useRef, useState } from "react";

export default function PlayMidiArea() {
    const { api } = useAPI();
    const { selectedMidi } = useContext(MidiContext);
    const { setCurrentRoute } = useContext(RoutesContext);
    const [currentTime, setCurrentTime] = useState(-2000);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(undefined as undefined|NodeJS.Timer);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if(!isPaused) setCurrentTime(prevTime => prevTime + 37);
        }, 37);

        return () => clearInterval(intervalRef.current);
    }, [isPaused]);

    const notes = selectedMidi?.tracks
        .filter(t => !t.isMuted)
        .map(t => t.notes)
        .reduce((prev, curr) => [...prev, ...curr], []) ?? [];
    notes.sort((a, b) => a.startsAt - b.startsAt);
    const totalTime = selectedMidi!.duration;
    const keyboardSize = api.settings.show().keyboard ?? 'piano';

    return (
        <Container>
            <Header>
                <Button onClick={() => setCurrentRoute('MidiSelect')}>Return</Button>
                <TimeControllersContainer>
                    <TimeController onClick={() => setCurrentTime(-2000)}>⏮︎</TimeController>
                    <TimeController onClick={() => setIsPaused(!isPaused)}>{isPaused ? '▶' : '⏸︎'}</TimeController>
                    <TimeController onClick={() => setCurrentTime(totalTime)}>⏭︎</TimeController>
                </TimeControllersContainer>
                <div></div>
            </Header>

            <ProgressBar onClick={(e) => setCurrentTime(e.clientX * totalTime / e.currentTarget.clientWidth)}>
                <ProgressBarFill $currenttime={currentTime} $totaltime={totalTime} />
            </ProgressBar>

            <MidiKeyboard 
                blackKeys={keyboard[keyboardSize].blackKeyNotes}
                currentTime={currentTime}
                totalTime={totalTime}
                notes={notes}
                onMidiEnd={() => setCurrentRoute('MidiSelect')}
                size={keyboardSize}
                whiteKeys={keyboard[keyboardSize].whiteKeyNotes}
            />
        </Container>
    );
}