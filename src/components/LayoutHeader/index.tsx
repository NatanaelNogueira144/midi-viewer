import logoImage from '../../assets/logo.png';
import { Container, Logo, LogoTitle, ToggleButton } from "./styles";

interface LayoutHeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (sidebarOpen: boolean) => void;
}

export default function LayoutHeader({ setSidebarOpen, sidebarOpen }: LayoutHeaderProps) {
    return (
        <Container>
            <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span />
                <span />
                <span />
            </ToggleButton>
            <Logo src={logoImage} alt="Logo" />
            <LogoTitle>MIDI Viewer</LogoTitle>
        </Container>
    );
}