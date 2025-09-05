import { IMidi } from "../../core/interfaces/models/midi.interface";
import { createContext, useState } from "react";

export interface MidiContextProps {
    selectedMidi?: IMidi;
    setSelectedMidi: (midi?: IMidi) => void;
}

export const MidiContext = createContext<MidiContextProps>({} as MidiContextProps);

export function MidiProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [selectedMidi, setSelectedMidi] = useState(undefined as undefined|IMidi);

    return (
        <MidiContext.Provider value={{ selectedMidi, setSelectedMidi }}>
            {children}
        </MidiContext.Provider>
    );
}

export default MidiContext;
