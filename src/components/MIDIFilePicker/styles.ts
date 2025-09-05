import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DropAreaLabel = styled.label`
    width: 100%;
`;

interface DropAreaProps {
    $isdragging: boolean;
}

export const DropArea = styled.div<DropAreaProps>`
    width: 100%;
    min-height: 150px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    text-align: center;
    border: 2px dashed ${({ $isdragging, theme }) => $isdragging ? theme.primaryColor : theme.textColor};
    padding: 1.5rem;
    background: ${({ $isdragging, theme }) => $isdragging ? theme.primaryColor : theme.backgroundColor};
    color: ${props => props.theme.textColor};
    transition: all 0.2s ease-in-out;
    cursor: pointer;
`;

export const FileName = styled.div`
    margin-top: 10px;
    font-weight: 500;
    color: ${props => props.theme.textColor};
    word-break: break-all;
`;

export const HiddenInput = styled.input`
    display: none;
`;