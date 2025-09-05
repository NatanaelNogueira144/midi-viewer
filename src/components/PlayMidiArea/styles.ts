import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-areas: 
        "header"
        "progress"
        "player";
    grid-template-rows: 45px 45px 1fr;
    grid-template-columns: 1fr;
    width: auto;
    height: 100vh;
`;

export const Header = styled.div.attrs(props => ({
    style: {
        backgroundColor: props.theme.headerColor
    }
}))`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
`;

export const TimeControllersContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const TimeController = styled.span.attrs(props => ({
    style: {
        color: props.theme.textColor
    }
}))`
    font-size: 1.5rem;
    width: 30px;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

export const ProgressBar = styled.div`
    grid-area: progress;
    width: 100%;
    background-color: #2C2C2C;
    cursor: pointer;
`;

interface ProgressBarFillProps {
    $totaltime: number;
    $currenttime: number;
}

export const ProgressBarFill = styled.div.attrs<ProgressBarFillProps>(props => ({
    style: {
        width: `${(props.$currenttime < 0 ? 0 : (
            props.$currenttime > props.$totaltime ? props.$totaltime : props.$currenttime
        )) * 100 / props.$totaltime}%`,
        backgroundColor: props.theme.primaryColor
    }
}))`
    height: 100%;
`;