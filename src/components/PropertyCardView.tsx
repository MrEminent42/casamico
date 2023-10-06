import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import defaultHouseImage from '../assets/default_house.png';

const PropertyCardView = () => {
    const navigate = useNavigate();

    let cardW = window.innerWidth * 29 / 100;
    let cardMargin = window.innerWidth / 100;

    return (
        <PropertyCardViewContainer>
            <PropertyCardRowCenterContainer>
                <PropertyCardRowContainer>
                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 1</div>
                        <div> 1 Task </div>
                    </PropertyCardContainer>

                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 2</div>
                        <div> 2 Tasks </div>
                    </PropertyCardContainer>

                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 3</div>
                        <div> 0 Tasks </div>
                    </PropertyCardContainer>
                </PropertyCardRowContainer>
            </PropertyCardRowCenterContainer>

            <PropertyCardRowCenterContainer>
                <PropertyCardRowContainer>
                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 4</div>
                        <div> 1 Task </div>
                    </PropertyCardContainer>

                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 5</div>
                        <div> 2 Tasks </div>
                    </PropertyCardContainer>

                    <PropertyCardContainer onClick={() => navigate("/1")} style={{ width: cardW, marginLeft: cardMargin, marginRight: cardMargin }}>
                        <img src={defaultHouseImage} alt="Default House" />
                        <div> Property 6</div>
                        <div> 0 Tasks </div>
                    </PropertyCardContainer>
                </PropertyCardRowContainer>
            </PropertyCardRowCenterContainer>
        </PropertyCardViewContainer>
    )
}

export default PropertyCardView

const PropertyCardViewContainer = styled.div`
    border-radius: 10px;
    padding: 10px;
    color: black;
`

const PropertyCardRowContainer = styled.div`
    display: flex;
    padding: 10px;
    border: 1px dotted black;
`

const PropertyCardRowCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PropertyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px dotted black;
    border-radius: 10px;
`