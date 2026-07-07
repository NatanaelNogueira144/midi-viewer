import Button from "../Button";
import MidiContext from "../../data/contexts/MidiContext";
import MidiKeyboard from "../MIDIKeyboard";
import RoutesContext from "../../data/contexts/RoutesContext";
import Soundfont from 'soundfont-player';
import useAPI from "../../data/hooks/useAPI";
import {
  Container,
  Header,
  ProgressBar,
  ProgressBarFill,
  TimeController,
  TimeControllersContainer,
  ToggleButton,
  TogglesContainer
} from "./styles";
import { useContext, useEffect, useRef, useState } from "react";

interface PlayMidiAreaProps {
  instruments: {[key: number]: Soundfont.Player};
}

export default function PlayMidiArea({ instruments }: PlayMidiAreaProps) {
  const { api } = useAPI();
  const { selectedMidi } = useContext(MidiContext);
  const { setCurrentRoute } = useContext(RoutesContext);
  const [currentTime, setCurrentTime] = useState(-2000);
  const [isPaused, setIsPaused] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const intervalRef = useRef(undefined as undefined|NodeJS.Timer);

  const notes = selectedMidi?.tracks
    .filter(t => !t.isMuted)
    .map(t => t.notes)
    .reduce((prev, curr) => [...prev, ...curr], []) ?? [];
  notes.sort((a, b) => a.startsAt - b.startsAt);
  const totalTime = selectedMidi!.duration;
  const keyboardSize = api.settings.show().keyboardSize ?? 'piano';

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if(!isPaused) setCurrentTime(prevTime => prevTime + 30);
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  return (
    <Container>
      <Header>
        <Button onClick={() => setCurrentRoute('MidiSelect')}>Return</Button>
        <TimeControllersContainer>
          <TimeController onClick={() => setCurrentTime(-2000)}>⏮︎</TimeController>
          <TimeController onClick={() => setIsPaused(!isPaused)}>{isPaused ? '▶' : '⏸︎'}</TimeController>
          <TimeController onClick={() => setCurrentTime(totalTime)}>⏭︎</TimeController>
        </TimeControllersContainer>
        <TogglesContainer>
          <ToggleButton 
            $isactive={showNotes} 
            onClick={() => setShowNotes(!showNotes)}
          >
            Aa
          </ToggleButton>
        </TogglesContainer>
      </Header>

      <ProgressBar onClick={(e) => setCurrentTime(e.clientX * totalTime / e.currentTarget.clientWidth)}>
        <ProgressBarFill $currenttime={currentTime} $totaltime={totalTime} />
      </ProgressBar>

      <MidiKeyboard 
        currentTime={currentTime}
        instruments={instruments}
        totalTime={totalTime}
        notes={notes}
        onMidiEnd={() => setCurrentRoute('MidiSelect')}
        showNotes={showNotes}
        keyboardSize={keyboardSize}
      />
    </Container>
  );
}