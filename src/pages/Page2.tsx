import React from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../images/arrow-left-circle.svg';
import house from "../images/house.jpg";
import addbuttonsvg from "../images/plus-button.svg";

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
                <AddButton src={addbuttonsvg}></AddButton>
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
    color: #D9D9D9;
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
    font-weight: 100;
    color: white;
    margin: 0;
    position: absolute;
    bottom: 10px;
    left: 15px;
`
//container to hold the filter and sort buttons and add buttons
const FilterandSortContainer = styled.div`
    border: 2px solid brown;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0;
    gap: 10px;
    width: 80vw;
`
//button for the filter option
const FilterButton = styled.button`
    background-color: #D9D9D9;
    border: none;
    color: #5F5F5F;
    width: 100px;
    height: 40px;
    padding: 10px 0;
    font-size: 16px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 40px;
`
//button for the sort option
const SortButton = styled.button`
    background-color: #D9D9D9;
    border: none;
    color: #5F5F5F;
    width: 100px;
    height: 40px;
    padding: 10px 0;
    font-size: 16px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 40px;
`
const AddButton = styled.img`
    border: 2px solid green;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: auto;
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