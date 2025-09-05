import RoutesContext from "../../data/contexts/RoutesContext";
import { Container, List, ListItem, Navigation } from "./styles";
import { useContext } from "react";

interface LayoutSidebarProps {
    isOpen: boolean;
}

export default function LayoutSidebar({ isOpen }: LayoutSidebarProps) {
    const { currentRoute, setCurrentRoute } = useContext(RoutesContext);
    
    return (
        <Container $isopen={isOpen}>
            <Navigation>
                <List>
                    <ListItem 
                        $isactive={currentRoute === 'Menu'}
                        onClick={() => setCurrentRoute('Menu')} 
                    >
                        Main Menu
                    </ListItem>
                    <ListItem 
                        $isactive={currentRoute === 'MidiSelect'}
                        onClick={() => setCurrentRoute('MidiSelect')} 
                    >
                        Play a Song
                    </ListItem>
                    <ListItem 
                        $isactive={currentRoute === 'Settings'}
                        onClick={() => setCurrentRoute('Settings')} 
                    >
                        Settings
                    </ListItem>
                </List>
            </Navigation>
        </Container>
    );
}