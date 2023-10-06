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
                <HouseImage src={house}></HouseImage>
                <BackLabel>
                    PROPERTY 1
                </BackLabel>
            </HouseContainer>
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
    border: 2px solid black;
    display: flex;
`
const HouseImage= styled.img`
    border: 2px solid black;
    width: 700px;
    height: 400px;
`

const HouseLabel = styled.p`
    font-size: 65px;
    margin: 0;
    alignment = center
`