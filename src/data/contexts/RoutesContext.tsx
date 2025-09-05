import { createContext, useState } from "react";

type Route = 'Menu'|'MidiSelect'|'MidiViewer'|'Settings';

export interface RoutesContextProps {
    currentRoute: Route;
    setCurrentRoute: (route: Route) => void;
}

export const RoutesContext = createContext<RoutesContextProps>({} as RoutesContextProps);

export function RoutesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [currentRoute, setCurrentRoute] = useState('Menu' as Route);

    return (
        <RoutesContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </RoutesContext.Provider>
    );
}

export default RoutesContext;
