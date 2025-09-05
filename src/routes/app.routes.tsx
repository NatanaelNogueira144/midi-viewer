import MIDISelectPage from '../pages/MIDISelectPage';
import MIDIViewerPage from '../pages/MIDIViewerPage';
import MenuPage from '../pages/MenuPage';
import RoutesContext from '../data/contexts/RoutesContext';
import SettingsPage from '../pages/SettingsPage';
import { useContext } from 'react';
import { MidiProvider } from '../data/contexts/MidiContext';

export default function AppRoutes() {
    const { currentRoute } = useContext(RoutesContext);

    return (
        <MidiProvider>
            {currentRoute === 'Menu' && <MenuPage />}
            {currentRoute === 'MidiSelect' && <MIDISelectPage />}
            {currentRoute === 'MidiViewer' && <MIDIViewerPage />}
            {currentRoute === 'Settings' && <SettingsPage />}
        </MidiProvider>
    );
}