import React, { createContext, useState } from 'react';
import dark from '../../styles/themes/dark';
import useAPI from '../hooks/useAPI';
import light from '../../styles/themes/light';

export interface ThemeContextProps {
    setTheme(theme: ITheme): void;
    theme: ITheme;
}

interface ITheme {
    title: string;
    primaryColor: string;
    headerColor: string;
    sidebarColor: string;
    backgroundColor: string;
    cardColor: string;
    textColor: string;
    headingColor: string;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { api } = useAPI();

    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = api.settings.show().colorTheme;
        return themeSaved === 'light' ? light : dark;
    });

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;