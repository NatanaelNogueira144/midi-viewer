import Button from "../Button";
import MidiContext from "../../data/contexts/MidiContext";
import RoutesContext from "../../data/contexts/RoutesContext";
import TrackCard from "../TrackCard";
import { ActionsContainer, Container, MIDITitle, TopHeader, TracksGrid } from "./styles";
import { IMidi } from "../../core/interfaces/models/midi.interface";
import { ITrack } from "../../core/interfaces/models/track.interface";
import { ITrackPallete } from "../../core/interfaces/models/track-pallete.interface";
import { isNoteNatural } from "../../core/utils/note-utils";
import { useContext } from "react";

interface MIDISettingsAreaProps {
    midi: IMidi;
}

export default function MIDISettingsArea({ midi }: MIDISettingsAreaProps) {
    const { setCurrentRoute } = useContext(RoutesContext);
    const { setSelectedMidi } = useContext(MidiContext);

    const updateColorChangeOnMIDI = (track: ITrack, trackColor: ITrackPallete) => {
        let newMidi = {...midi} as IMidi;
        let trackIndex = newMidi.tracks.findIndex(t => t === track);
        newMidi.tracks[trackIndex] = {
            ...newMidi.tracks[trackIndex], 
            whiteKeyColor: trackColor.whiteKey,
            blackKeyColor: trackColor.blackKey,
            textColor: trackColor.textColor,
            notes: newMidi.tracks[trackIndex].notes.map(note => ({
                ...note,
                color: isNoteNatural(note.index) ? trackColor.whiteKey : trackColor.blackKey
            }))
        };
        
        setSelectedMidi(newMidi);
    }

    const updateMuteChangeOnMIDI = (track: ITrack, isMuted: boolean) => {
        let newMidi = {...midi} as IMidi;
        let trackIndex = newMidi.tracks.findIndex(t => t === track);

        newMidi.tracks[trackIndex].isMuted = isMuted;
        setSelectedMidi(newMidi);
    }

    return (
        <Container>
            <TopHeader>
                <MIDITitle>{midi.name}</MIDITitle>
                <ActionsContainer>
                    <Button onClick={() => setSelectedMidi(undefined)}>
                        Return
                    </Button>
                    <Button onClick={() => setCurrentRoute('MidiViewer')}>
                        <span>▶</span> Play
                    </Button>
                </ActionsContainer>
            </TopHeader>
            
            <TracksGrid>
                {midi.tracks.map((track, key) => (
                    <TrackCard 
                        onColorChange={(trackColor) => updateColorChangeOnMIDI(track, trackColor)}
                        onMutedChange={(isMuted) => updateMuteChangeOnMIDI(track, isMuted)}
                        track={track}
                        key={key}
                    />
                ))}
            </TracksGrid>
        </Container>
    );
}