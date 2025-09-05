import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
`;

export const TopHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
`;

export const MIDITitle = styled.h1`
    font-size: 1.5rem;
`;

export const ActionsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const TracksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media(max-width: 992px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(max-width: 600px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;