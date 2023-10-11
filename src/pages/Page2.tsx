import React from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../images/arrow-left-circle.svg';
import house from "../images/house.jpg";

const Page2 = () => {
    return (
        <TaskContainer>
            <BackButtonContainer>
                <BackButton src={backbuttonsvg}></BackButton>
                <BackLabel>back</BackLabel>
            </BackButtonContainer>
            <HouseContainer>
                <HouseImage style={{backgroundImage:
                `url(${house})`, 
                fontSize:'50px',
                backgroundPosition: 'left',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(2px) opacity(80%)'}}>
                </HouseImage>
                <HouseLabel>
                    PROPERTY 1
                </HouseLabel>
            </HouseContainer>
            <FilterandSortContainer>
                Yo
            </FilterandSortContainer>
            <TaskListContainer>
                Task1
                Task2
                Task3
            </TaskListContainer>
        </TaskContainer>
    )
}

export default Page2

const TaskContainer = styled.div`
    border: 2px solid blue;
    display: flex;
    flex-direction: column;
`

const BackButtonContainer = styled.div`
    border: 2px solid red;
    display: flex;
    align-items: center;
    padding: 0;
`

const BackButton = styled.img`
    border: 2px solid green;
    width: 30px;
    height: 30px;
`

const BackLabel = styled.p`
    font-size: 15px;
    margin: 0;
`

const HouseContainer = styled.div`
    border: 2px solid blue;
    display: flex;
    width: 600px;
    height: 400px;
`
const HouseImage= styled.img`
    border: 2px solid yellow;
    width: 600px;
    height: 400px;
`

const HouseLabel = styled.p`
    font-size: 85px;
    color: white;
    margin: 0;
    position: absolute;
    bottom: 200px;
    left: 10px;
    filter: drop-shadow(5px 5px 15px black);
    -webkit-text-stroke-width: .5px;
    -webkit-text-stroke-color: black;
`

const FilterandSortContainer = styled.div`
    border: 2px solid brown;
    display: flex;
    align-items: left;
    padding: 0;
`

const TaskListContainer = styled.div`
    border: 2px solid purple;
    display: flex;
    align-items: left;
    padding: 0;
    flex-direction: column;
`