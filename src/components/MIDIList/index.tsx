import MidiContext from "../../data/contexts/MidiContext";
import useAPI from "../../data/hooks/useAPI";
import { 
    Container, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemInfo, 
    ListItemLeft, 
    ListItemRight, 
    ListItemTitle 
} from "./styles";
import { IMidi } from "../../core/interfaces/models/midi.interface";
import { MidiList } from "../../core/types/midi-list.type";
import { formatToTime } from "../../core/utils/time-utils";
import { useContext } from "react";

interface MIDIListProps {
    midis: MidiList;
    setMidis: (midis: MidiList) => void;
}

export default function MIDIList({ midis, setMidis }: MIDIListProps) {
    const { api } = useAPI();
    const { setSelectedMidi } = useContext(MidiContext);

    const deleteMIDI = (midi: IMidi) => {
        api.midi.destroy(midis.findIndex(m => m === midi));
        setMidis(api.midi.list());
    };
    
    return (
        <Container>
            <List>
                {midis.map((midi, key) => (
                    <ListItem key={key}>
                        <ListItemLeft>
                            <ListItemTitle>{midi.name}</ListItemTitle>
                            <ListItemInfo>
                                <strong>Duration:</strong> {formatToTime(midi.duration)} | 
                                <strong> Tempo:</strong> {midi.tempo} BPM | 
                                <strong> Tracks:</strong> {midi.tracks.length} | 
                                <strong> Notes:</strong> {midi.tracks.map(track => track.notes.length).reduce((a, s) => a + s, 0)}
                            </ListItemInfo>
                        </ListItemLeft>

                        <ListItemRight>
                            <ListItemButton onClick={() => setSelectedMidi(midi)}>▶</ListItemButton>
                            <ListItemButton onClick={() => deleteMIDI(midi)}>✖</ListItemButton>
                        </ListItemRight>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}