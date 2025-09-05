import styled from "styled-components";

export const Container = styled.div`
    padding: 20px 0px;
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    gap: 20px;
`;

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background-color: ${props => props.theme.cardColor};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    gap: 10px;
`;

export const ListItemLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ListItemTitle = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
`;

export const ListItemInfo = styled.span`
    font-size: 0.9rem;
    font-weight: 400;
`;

export const ListItemRight = styled.div`
    display: flex;
    gap: 5px;
`;

export const ListItemButton = styled.span`
    padding: 5px 12px;
    border-radius: 10px;
    font-size: 1.5rem;
    color: ${props => props.theme.textColor};
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;