import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import defaultHouseImage from '../assets/default_house.png';

const PropertyCardView = () => {
    const navigate = useNavigate();

    return (
        <div>
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
            </PropertyCardViewContainer>
        </div>
    )
}

export default PropertyCardView

const PropertyCardViewContainer = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto auto;
    color: black;
`

const PropertyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px dotted black;
    border-radius: 10px;
`