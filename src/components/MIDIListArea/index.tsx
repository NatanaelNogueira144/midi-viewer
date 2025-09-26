import MIDIList from "../MIDIList";
import MidiFilePicker from "../MIDIFilePicker";
import useAPI from "../../data/hooks/useAPI";
import { ISaveMidiRequest } from "../../core/interfaces/requests/save-midi-request.interface";
import { MidiList } from "../../core/types/midi-list.type";
import { parseMIDIFile } from "../../core/utils/midi-utils";
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
                parseMIDIFile(file, (midi) => setMidis([...midis, api.midi.store({...midi} as ISaveMidiRequest)]));
            }} />

            <MIDIList midis={midis} setMidis={setMidis} />
        </>
    );
}