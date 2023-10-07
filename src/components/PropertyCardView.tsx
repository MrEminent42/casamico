import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import defaultHouseImage from '../assets/default_house.png';

const PropertyCardView = () => {
    const navigate = useNavigate();

    return (
        <PropertyCardViewContainer>
            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 1</div>
                <div> 1 Task </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 2</div>
                <div> 2 Tasks </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 3</div>
                <div> 0 Tasks </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 4</div>
                <div> 1 Task </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 5</div>
                <div> 2 Tasks </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 6</div>
                <div> 0 Tasks </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 7</div>
                <div> 1 Task </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 8</div>
                <div> 2 Tasks </div>
            </PropertyCardContainer>

            <PropertyCardContainer onClick={() => navigate("/2")}>
                <img src={defaultHouseImage} alt="Default House" />
                <div> Property 9</div>
                <div> 0 Tasks </div>
            </PropertyCardContainer>
        </PropertyCardViewContainer>
    )
}

export default PropertyCardView

const PropertyCardViewContainer = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto auto;
    color: black;
    height: 83vh;
    -ms-overflow-style: none;
    overflow: auto;
    padding: 0 1rem;
    scrollbar-width: none;
`

const PropertyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px dotted black;
    border-radius: 10px;
`