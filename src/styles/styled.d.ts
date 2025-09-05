import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        primaryColor: string;
        headerColor: string;
        sidebarColor: string;
        backgroundColor: string;
        cardColor: string;
        textColor: string;
        headingColor: string;
    };
}