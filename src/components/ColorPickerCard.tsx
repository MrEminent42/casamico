import React from 'react';
import styled from 'styled-components';

interface ColorPickerCardProps {
    color: string;
    selected: boolean;
    handleColorClick: (color: string) => void;
}

const ColorPickerCard = ({ color, selected, handleColorClick }: ColorPickerCardProps) => {
    const handleClick = () => {
        handleColorClick(color);
    }

    return (
        <Color 
            color={color}
            selected={selected}
            onClick={handleClick}
        />
    )
}

export default ColorPickerCard

const Color = styled.div<{ selected: boolean, color: string }>`
    background-color: ${props => props.color};

    border-radius: 12px;
    margin: 10px 0;
    width: ${props => props.selected ? '90px' : '60px'};
    height: ${props => props.selected ? '53px' : '38px'};

    transition: transform 0.2s ease-in-out;
    ${props => !props.selected && `
        &:hover {
            transform: scale(1.2);
        }
    `}
`
