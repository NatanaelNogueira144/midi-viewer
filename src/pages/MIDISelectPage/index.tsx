import Layout from "../../components/Layout";
import MIDIListArea from "../../components/MIDIListArea";
import MIDISettingsArea from "../../components/MIDISettingsArea";
import MidiContext from "../../data/contexts/MidiContext";
import { useContext } from "react";

export default function MIDISelectPage() {
    const { selectedMidi } = useContext(MidiContext);

    return (
        <Layout>
            {selectedMidi ? (
                <MIDISettingsArea midi={selectedMidi} />
            ) : (
                <MIDIListArea />
            )}
        </Layout>
    );
}