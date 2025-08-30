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
    border: 2px dashed ${({ $isdragging }) => ($isdragging ? "#58A6FF" : "#AAA")};
    border-radius: 10px;
    background: ${({ $isdragging }) => ($isdragging ? "#F0FAFF" : "#FAFAFA")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 0.9rem;
    text-align: center;
    padding: 1.5rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
`;

export const FileName = styled.div`
    margin-top: 10px;
    font-weight: 500;
    color: #333;
    word-break: break-all;
`;

export const HiddenInput = styled.input`
    display: none;
`;