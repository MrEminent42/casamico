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
    // width: 50px;
    // height: 38px;
    border-radius: 12px;
    margin: 10px 0;
    width: ${props => props.selected ? '80px' : '50px'};
    height: ${props => props.selected ? '53px' : '38px'};

    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
`
