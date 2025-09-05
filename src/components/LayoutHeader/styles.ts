import styled from "styled-components";

export const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    background-color: ${props => props.theme.headerColor};
    gap: 15px;
`;

export const ToggleButton = styled.button`
    display: none;
	flex-direction: column;
	gap: 5px;
	background: none;
	border: none;
	cursor: pointer;

    > span {
        display: block;
        width: 35px;
        height: 5px;
        background: ${props => props.theme.textColor};
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const Logo = styled.img`
    width: 50px;
	height: 50px;
`;

export const LogoTitle = styled.span`
    font-size: 2.8rem;
    font-weight: 600;
    color: ${props => props.theme.textColor};
`;