import React from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../images/arrow-left-circle.svg';
import house from "../images/house.jpg";

const Page2 = () => {
    return (
        <TaskContainer>
            <BackButtonContainer>
                <BackButton src={backbuttonsvg}></BackButton>
                <BackLabel>Back</BackLabel>
            </BackButtonContainer>
            <HouseContainer>
                <Mask1>
                <HouseImage style={{backgroundImage:
                `url(${house})`, 
                fontSize:'50px',
                backgroundPosition: 'left',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}>
                </HouseImage>
                </Mask1>
                <HouseLabel>
                    PROPERTY 1
                </HouseLabel>
            </HouseContainer>
            <FilterandSortContainer>
                <FilterButton>
                    Filter
                </FilterButton>
                <SortButton>
                    Sort
                </SortButton>
                <AddButton>
                    +
                </AddButton>
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
    cursor: pointer;
`

const BackLabel = styled.p`
    font-size: 15px;
    margin: 0;
    padding: 5px;
`
//container to hold the house photo and the text
const HouseContainer = styled.div`
    border: 2px solid blue;
    display: flex;
    width: 600px;
    height: 400px;
`
//container for the house image
const HouseImage= styled.img`
    border: 2px solid yellow;
    width: 600px;
    height: 400px;
`
//label to hold the name of the property
const HouseLabel = styled.p`
    font-size: 85px;
    color: grey;
    margin: 0;
    position: absolute;
    bottom: 200px;
    left: 10px;
    -webkit-text-stroke-width: .5px;
    -webkit-text-stroke-color: black;
`
//container to hold the filter and sort buttons and add buttons
const FilterandSortContainer = styled.div`
    border: 2px solid brown;
    display: flex;
    align-items: left;
    padding: 0;
    
`
//button for the filter option
const FilterButton = styled.button`
    background-color: #a9a9a9;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    

`
//button for the sort option
const SortButton = styled.button`
    background-color: #a9a9a9;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    

`
//add task button
const AddButton = styled.button`
    background-color: #a9a9a9;
    border: none;
    color: white;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    margin-left: auto 

`
//container for the task list
const TaskListContainer = styled.div`
    border: 2px solid purple;
    display: flex;
    align-items: left;
    padding: 0;
    flex-direction: column;
`
//created a mask to apply a gradient to the property photo
const Mask1 = styled.mask`
    -webkit-mask-image: linear-gradient(black, transparent);
    mask-image: linear-gradient(black, transparent);
`