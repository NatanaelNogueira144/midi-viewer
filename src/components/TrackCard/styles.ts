import styled from "styled-components";

interface ContainerProps {
    $bgcolor: string;
    $textcolor: string;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    background-color: ${props => props.$bgcolor};
    color: ${props => props.$textcolor};
`;

export const ColorsContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

interface ColorSquareProps {
    $color: string;
    $isSelected: boolean;
}

export const ColorSquare = styled.div<ColorSquareProps>`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${props => props.$color};
    border: 2px solid ${props => props.$isSelected ? 'black' : props.$color};
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

export const HeaderInfoContainer = styled.div``;

export const Subtitle = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
`;

export const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export const SpeakerSwitch = styled.button`
    font-size: 2rem;
    background-color: transparent;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

interface ColorSelectorProps {
    $color: string;
}

export const ColorSelector = styled.div<ColorSelectorProps>`
    width: 40px;
    height: 40px;
    border: 2px solid black;
    border-radius: 4px;
    background-color: ${props => props.$color};
    cursor: pointer;
`;