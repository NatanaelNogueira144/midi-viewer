import styled from "styled-components";

export const Container = styled.button`
    padding: 10px;
    font-size: 1.2rem;
    border-radius: 10px;
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.textColor};
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;