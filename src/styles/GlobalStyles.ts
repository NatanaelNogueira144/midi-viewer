import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
        scroll-padding-top: 70px;
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Lato', sans-serif;
    }

    button {
        cursor: pointer;
    }

    h1 {
        font-size: 1.5rem;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.headingColor};
    } 

    p, span {
        font-size: 1rem;
        margin-bottom: 7px;
        color: ${props => props.theme.textColor};
    }
`;