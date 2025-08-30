import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
`;

export const MidiPickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 400px;
    max-width: 400px;
    height: 100%;
`;

export const InfoCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: #F0FAFF;
    color: #555;
`;

export const InfoCardTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
`;

export const InfoCardData = styled.span`
    font-size: 1.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.secondary};
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.secondary};
    font-weight: 600;
    font-size: 1.5rem;
    color: ${props => props.theme.colors.white};
    transition: opacity .3s;

    &:hover{
        opacity: .7;
    }
`;