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
        margin-bottom: 30px; 
    }

    p {
        font-size: 1rem;
        margin-bottom: 1rem;
    }
`;