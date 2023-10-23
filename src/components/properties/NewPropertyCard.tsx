import React from 'react'
import { PropertyGridItemPadding } from '../../pages/Home';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/add.png';

const NewPropertyCard = () => {
    let navigate = useNavigate();

    return (
        <PropertyGridItemPadding
            onClick={() => navigate("add")}
        >
            <AddPropertyCard>
                <AddIconImage src={addIcon} />
            </AddPropertyCard>
        </PropertyGridItemPadding>
    )
}

export default NewPropertyCard

const AddPropertyCard = styled.div`
    border: 3px solid #cbcbcb;
    border-radius: 10px;
    height: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
    }
`

const AddIconImage = styled.img`
    object-fit: contain;
    max-height: 30px;
`

