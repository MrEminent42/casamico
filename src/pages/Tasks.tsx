import { useEffect, useState } from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../assets/arrow-left-circle.svg';
import addbuttonsvg from "../assets/plus-button.svg";
import TaskViewButton from '../components/TaskViewButton';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { getTasksOfProperty, toggleTaskStatus } from '../controllers/TaskController';
import { getProperty } from '../controllers/PropertyController';
import AddTask from './AddTask';
import Popup from '../components/Popup';
import { Database } from "../supabase/supabase";
import TasksSection from '../components/TasksSection';
import { displayError } from '../App';

const Page2 = () => {

    const navigate = useNavigate();
    const [propertyId, setPropertyId] = useState<number>(0);
    const [property, setProperty] = useState<Database['public']['Tables']['Properties']['Row'] | null>(null);
    const params = useParams();
    const [tasks, setTasks] = useState<Database['public']['Tables']['Tasks']['Row'][]>([]);

    // this runs once when a webpage is loaded
    useEffect(() => {
        if (propertyId) {
            getProperty(propertyId).then((property) => {
                setProperty(property);
                getTasksOfProperty(propertyId).then((tasks) => {
                    setTasks(tasks);
                }).catch((error) => displayError(error, "get tasks of selected property"));
            }).catch((error) => {
                displayError(error, "get selected property");
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

    const handleToggle = async (task: Database['public']['Tables']['Tasks']['Row']) => {
        try {
            const updatedTask = await toggleTaskStatus(task.task_id, task.completed);
            // update the task in the state
            setTasks(tasks.map((t) => (t.task_id === updatedTask.task_id ? updatedTask : t)));
        } catch (error) {
            displayError(error, "toggle task completion status")
        }
    }


    return (
        <>
            <TaskContainer>
                <BackButtonContainer onClick={() => navigate("/")}>
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
                    <div style={{ flexGrow: 1 }} />

                    <AddButton src={addbuttonsvg} onClick={() => navigate("add")}></AddButton>
                </FilterandSortContainer>
                <TasksSection
                    sectionLabel='To Do'
                    tasks={tasks.filter((task) => !task.completed)}
                    handleClick={handleToggle}
                />
                <TasksSection
                    sectionLabel="Completed"
                    tasks={tasks.filter((task) => task.completed)}
                    handleClick={handleToggle}
                />
            </TaskContainer>
            <Routes>
                <Route path="add" element={
                    <Popup
                        onClickOutside={() => navigate("")}
                        onKeyboardEsc={() => navigate("")}
                        element={<AddTask goBack={() => navigate("")} property_id={propertyId} />}
                    />
                } />
            </Routes>
        </>
    )
}

export default Page2

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 35px;
`

const BackButtonContainer = styled.button`
    display: flex;
    align-items: center;
    margin: 10px 10px 10px 0;
    background: none;
    border: none;
    width: 100px;
    cursor: pointer;
`

const BackButton = styled.img`
    width: 30px;
    height: 30px;
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