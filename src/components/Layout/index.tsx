import LayoutHeader from '../LayoutHeader';
import LayoutSidebar from '../LayoutSidebar';
import { Container, Main } from "./styles";
import { useState } from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    return (
        <Container>
            <LayoutHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <LayoutSidebar isOpen={sidebarOpen} />
            <Main>{children}</Main>
        </Container>
    );
}