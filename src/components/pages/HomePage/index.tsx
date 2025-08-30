import PickMidiArea from "../../home/PickMidiArea";
import PlayMidiArea from "../../home/PlayMidiArea";
import { IMidi } from "../../../core/interfaces/midi.interface";
import { useState } from "react";

enum Area {
    PickMidi,
    PlayMidi
}

export default function HomePage() {
    const [currentArea, setCurrentArea] = useState(Area.PickMidi);
    const [midi, setMidi] = useState(null as IMidi|null);

    return currentArea === Area.PickMidi ? (
        <PickMidiArea onPlayClick={(midi) => {
            setMidi(midi);
            setCurrentArea(Area.PlayMidi);
        }} />
    ) : (midi && (
        <PlayMidiArea 
            midi={midi} 
            onMidiEnd={() => setCurrentArea(Area.PickMidi)} 
        />
    ));
}