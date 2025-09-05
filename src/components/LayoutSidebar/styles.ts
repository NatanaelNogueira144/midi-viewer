import styled from "styled-components";

interface ContainerProps {
    $isopen: boolean;
}

export const Container = styled.aside<ContainerProps>`
    background-color: ${props => props.theme.sidebarColor};

    @media(min-width: 769px) {
        grid-area: aside;
    }

    @media(max-width: 768px) {
        display: ${props => props.$isopen ? 'block' : 'none'};
        position: absolute;
        width: 250px;
        height: calc(100% - 70px);
        top: 70px;
    }
`;

export const Navigation = styled.nav``;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
`;

interface ListItemProps {
    $isactive: boolean;
}

export const ListItem = styled.li<ListItemProps>`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid black;
    background: ${props => props.$isactive ? props.theme.primaryColor : 'none'};
    color: ${props => props.theme.textColor};
    transition: ease-in 0.1s;

    &:hover {
        background-color: ${props => props.theme.primaryColor};
    }
`;