import MidiContext from "../../data/contexts/MidiContext";
import PlayMidiArea from "../../components/PlayMidiArea";
import Soundfont from 'soundfont-player';
import getInstrumentByNumber from "../../core/utils/get-instruments-by-number";
import { IMidi } from "../../core/interfaces/models/midi.interface";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";

export default function MIDIViewerPage() {
    const { selectedMidi } = useContext(MidiContext);
    const [instruments, setInstruments] = useState(undefined as {[key: number]: Soundfont.Player}|undefined);

    useEffect(() => {
        const loadInstruments = async (midi: IMidi): Promise<void> => {
            const audioCtx = new (window.AudioContext)();
            let midiInstruments: {[key: number]: Soundfont.Player} = {};
            for(let i = 0; i < midi.tracks.length; i++) {
                if(!midiInstruments?.[midi.tracks[i].instrumentIndex]) {
                    midiInstruments[midi.tracks[i].instrumentIndex] = await getInstrumentByNumber(audioCtx, midi.tracks[i].instrumentIndex);
                }
            }

            setInstruments(midiInstruments);
        }
        
        if(selectedMidi) loadInstruments(selectedMidi);
    }, [selectedMidi]);
    
    return instruments ? (
        <PlayMidiArea instruments={instruments} />
    ) : (
        <LoadingScreen />
    );
}