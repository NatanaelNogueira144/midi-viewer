import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.backgroundColor};
`;

export const Text = styled.span`
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.textColor};
`;