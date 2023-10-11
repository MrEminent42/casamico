import React from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../images/arrow-left-circle.svg';
import house from "/images/house.jpg";

const Page2 = () => {
    return (
        <TaskContainer>
            <BackButtonContainer>
                <BackButton src={backbuttonsvg}></BackButton>
                <BackLabel>Back</BackLabel>
            </BackButtonContainer>
            <HouseContainer>
                <HouseImageOverlay></HouseImageOverlay>
                <HouseLabel>
                    property 1
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
                <BackgroundOfTaskContainer>
                    <TheTaskContainer>
                        <TextTaskTitle>
                        Clean the Damn Dishes yurr
                        </TextTaskTitle>
                        <DaysLeftLabel>
                            2 Days
                        </DaysLeftLabel>
                    </TheTaskContainer>
                    <AddyLabel>
                        Property 1
                    </AddyLabel>
                </BackgroundOfTaskContainer>
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
const HouseContainer = styled.div`
    border: 2px solid blue;
    width: 80vw;
    height: 250px;
    position: relative;
    border-radius: 10px;

    background-image: url(${house});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`
//the overlay for the house image
const HouseImageOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    content: "";
`

const HouseLabel = styled.p`
    font-size: 50px;
    color: white;
    margin: 0;
    position: absolute;
    bottom: 5px;
    left: 10px;
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
    border-radius: 40px;
    

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
    border-radius: 40px;
    

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
    border-radius: 40px;
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

const BackgroundOfTaskContainer = styled.div`
    border: 2px solid red;
    background-color: #DFC5FE;
    display: flex;
    align-items: left;
    padding:0
    flex-direction: column;
    height: 55px;
    border-radius: 40px;
`
const TheTaskContainer = styled.div`
    border: 2px solid orange;
    background-color: #C994E3;
    opacity:1;
    display: flex;
    align-items: left;
    padding:0
    flex-direction: column;
    height: 55px;
    border-radius: 40px;
    width: 800px;
`

const TextTaskTitle = styled.p`
    font-size: 28px;
    color: black;
    margin: 10px;
    padding-left: 10px;
    -webkit-text-stroke-width: .5px;
    -webkit-text-stroke-color: ;
`

const DaysLeftLabel = styled.p`
    font-size: 28px;
    color: grey;
    margin: 10px;
    margin-left: auto;
    padding-right: 10px;
`

const AddyLabel = styled.p`
    font-size: 28px;
    color: grey;
    margin: 10px;
    margin-left: auto;
    padding-right: 10px;
`