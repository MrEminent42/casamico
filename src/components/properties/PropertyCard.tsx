import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropertyGridItemPadding } from '../../pages/Home';
import { Property } from '../../Types';

interface PropertyCardProps {
    property: Property;
    noPadding?: boolean;
}

const PropertyCard = (props: PropertyCardProps) => {
    return (
        props.noPadding ? (
            <PropertyCardContents {...props} />
        ) : (
            <PropertyGridItemPadding>
                <PropertyCardContents {...props} />
            </PropertyGridItemPadding>
        )
    )
}

const PropertyCardContents = (props: PropertyCardProps) => {
    let { address, image_url, property_id } = props.property;
    let navigate = useNavigate();

    return (
        <PropertyCardContainer
            onClick={() => {
                navigate("/property/" + property_id);
            }}
        >
            <PropertyImage src={image_url} />
            <CardTitle>
                {address}
            </CardTitle>
            <CardText>
                -1 Tasks
            </CardText>
        </PropertyCardContainer>
    )
}

export default PropertyCard

// to contain the image, title, and text, etc.
const PropertyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`
const PropertyImage = styled.img`
    // prevent image from overflowing
    max-width: 100%;
    height: 250px;
    object-fit: cover;

    // extra space so image can grow a bit
    margin-bottom: 10px;

    // add a nice-looking border radius and shadow
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // on hover, "raise" it by scaling the image up a bit, 
    // and making more shadow.
    // also, cursor should change to a pointer to indicate clickable
    &:hover {
        transform: scale(1.03);
        cursor: pointer;
        box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
    }
`

const CardTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 5px 0px;
    color: #4c4c4c;
`

const CardText = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
    color: grey;
`