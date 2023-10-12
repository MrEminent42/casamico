import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../assets/arrow-left-circle.svg';
import house from "../assets/house.jpg";
import addbuttonsvg from "../assets/plus-button.svg";
import TaskViewButton from '../components/TaskViewButton';
import Task from '../components/Task';
import { useNavigate, useParams } from 'react-router';
import { getTasksOfProperty } from '../controllers/TaskController';
import { getProperty } from '../controllers/PropertyController';
import { Property } from '../Types';

const Page2 = () => {

    const navigate = useNavigate();
    const [propertyId, setPropertyId] = useState<number>(0);
    const [property, setProperty] = useState<Property | null>(null);
    const params = useParams();

    // this runs once when a webpage is loaded
    useEffect(() => {
        if (propertyId) {
            getTasksOfProperty();

            getProperty(propertyId).then((property) => {
                setProperty(property);
            }).catch((error) => {
                alert(JSON.stringify(error));
                navigate('/');
            });
        }
    }, [propertyId, navigate]);

    // this runs whenever params.id or navigate changes
    useEffect(() => {
        if (!params.id) {
            alert("No property id provided!");
            navigate('/');
        } else {
            setPropertyId(+params.id);
        }
    }, [params.id, navigate])

    return (
        <TaskContainer>
            <BackButtonContainer>
                <BackButton src={backbuttonsvg}></BackButton>
                <BackLabel>Back</BackLabel>
            </BackButtonContainer>
            <HouseContainer style={{ backgroundImage: `url(${property?.image_url})` }}>
                <HouseImageOverlay></HouseImageOverlay>
                <HouseLabel>
                    {property?.address}
                </HouseLabel>
            </HouseContainer>
            <FilterandSortContainer>
                <TaskViewButton
                    label="Filter"
                    onClick={() => console.log("Filter button clicked")}
                />
                <TaskViewButton
                    label="Sort"
                    onClick={() => console.log("Sort button clicked")}
                />
                <AddButton src={addbuttonsvg}></AddButton>
            </FilterandSortContainer>
            <TaskListContainer>
                <Task
                    title="Task 1"
                    due="Due 1"
                    bg_color="#E1CAE8"
                />
            </TaskListContainer>
        </TaskContainer>
    )
}

export default Page2

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 35px;
`

const BackButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px 10px 0;
`

const BackButton = styled.img`
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
    width: 80vw;
    height: 250px;
    position: relative;
    border-radius: 12px;

    /* background-image: url(${house}); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    margin: 0 10px 10px 0;
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
    border-radius: 12px;
`

const HouseLabel = styled.p`
    font-size: 50px;
    font-weight: 100;
    color: white;
    margin: 0;
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-weight: 600;
`
//container to hold the filter and sort buttons and add buttons
const FilterandSortContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0;
    gap: 10px;
    width: 80vw;

    margin: 0 10px 10px 0;
`
const AddButton = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: auto;
`
//container for the task list
const TaskListContainer = styled.div`
    padding: 0;
    display: flex;
    align-items: left;
    flex-direction: column;

    margin: 0 10px 10px 0;

`