import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropertyGridViewWrapper } from './PropertyCardView';


interface PropertyCardProps {
    name: string;
    address: string;
    image: string;
    numTasks: number;
}

const PropertyCard = (props: PropertyCardProps) => {
    let { name, address, image, numTasks } = props;
    let navigate = useNavigate();

    return (
        <PropertyGridViewWrapper>
            <PropertyCardContainer
                onClick={() => navigate("/2")}
            >
                <PropertyImage src={image} />
                <CardTitle>
                    {name}
                </CardTitle>
                <CardText>
                    <div> {address} </div>
                    <div> {numTasks} Tasks </div>
                </CardText>
            </PropertyCardContainer>
        </PropertyGridViewWrapper>
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
    max-height: 250px;
    height: auto;
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
`

const CardText = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
`