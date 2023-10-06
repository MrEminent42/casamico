import React from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../images/arrow-left-circle.svg';
import house from "/images/house.jpg";

const Page2 = () => {
    return (
        <TaskContainer>
            <BackButtonContainer>
                <img src={backbuttonsvg} />
                <HouseContainer>
                    <img src={house} />
                </HouseContainer>
            </BackButtonContainer>
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
`
const HouseContainer = styled.div`
    border: 2px solid black;
    display: flex;
`