import React from "react";
import styled from "styled-components";

interface FilterButtonProps {
    onClick: () => void;
    label: string;
}

const FilterButton = ({ onClick, label }: FilterButtonProps) => {
    return (
        <FilterButtonContainer onClick={onClick}>
            {label}
        </FilterButtonContainer>
    )
}

export default FilterButton

const FilterButtonContainer = styled.button`
    background-color: #D9D9D9;
    border: none;
    color: #5F5F5F;
    width: 100px;
    height: 40px;
    padding: 10px 0;
    font-size: 16px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 40px;
`


