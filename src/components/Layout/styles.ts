import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100vh;
    grid-template-areas: 
        "header header"
        "aside main";
    grid-template-rows: 70px 1fr;
    grid-template-columns: 200px 1fr;

    @media(max-width: 768px){
        grid-template-rows: 70px 1fr;
        grid-template-columns: 1fr;
        grid-template-areas:
            "header"
            "main";
    }
`;

export const Main = styled.aside`
    grid-area: main;
    background-color: ${props => props.theme.backgroundColor};
    padding: 20px;
`;