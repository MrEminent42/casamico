import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components';
import backbuttonsvg from '../assets/arrow-left-circle.svg';
import addbuttonsvg from "../assets/plus-button.svg";
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { getTasksAndTagsOfProperty, getTasksOfProperty, toggleTaskStatus } from '../controllers/TaskController';
import AddEditTask from './AddEditTask';
import Popup from '../components/Popup';
import { Database } from "../supabase/supabase";
import SortFilterPopup from '../components/SortFilterPopup';

import TasksSection from '../components/TasksSection';
import { displayError } from '../App';
import { getProperty } from '../controllers/GetPropertyController';


const Page2 = () => {

    const navigate = useNavigate();
    const [propertyId, setPropertyId] = useState<number>(0);
    const [property, setProperty] = useState<Database['public']['Tables']['Properties']['Row'] | null>(null);
    const params = useParams();
    // holds all tasks. these aren't displayed
    const [allTasks, setAllTasks] = useState<Database['public']['Tables']['Tasks']['Row'][]>([]);
    // holds filtered & sorted tasks
    const [aggregatedTasks, setAggregatedTasks] = useState<Database['public']['Tables']['Tasks']['Row'][]>([]);

    // aggregation options
    const [selectedTags, setSelectedTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
    const [selectedDueBefore, setSelectedDueBefore] = useState<string>("");
    const [selectedRooms, setSelectedRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);
    const [selectedSort, setSelectedSort] = useState<string | null>(null);

    // whenever params.id or navigate changes, verify that a valid property id is selected
    useEffect(() => {
        if (!params.id) {
            alert("No property id provided!");
            navigate('/');
        } else {
            setPropertyId(+params.id);
        }
    }, [params.id, navigate])

    // fetches and property info and task list and puts them in their corresponding states
    const fetchTasksAndProperty = useCallback(async () => {
        if (propertyId) {
            try {
                // fetch & set property and tasks in parallel
                await Promise.all([
                    getProperty(propertyId).then((property) => setProperty(property)),
                    getTasksOfProperty(propertyId).then((tasks) => setAllTasks(tasks))
                ]);
            } catch (err) {
                displayError(err, "loading property info & tasks");
                navigate('/');
                return;
            }
        }
    }, [navigate, propertyId]);

    // fetch info when propertyId is changed (when the page is first loaded, 
    // or when the user navigates to a different property)
    useEffect(() => {
        fetchTasksAndProperty();
    }, [propertyId, navigate, fetchTasksAndProperty]);

    // mark task as completed or not should be done locally and in DB
    const handleToggleTask = async (task: Database['public']['Tables']['Tasks']['Row']) => {
        try {
            const updatedTask = await toggleTaskStatus(task.task_id, task.completed);
            // update all tasks. another useEffect should automatically update 
            // aggregated tasks, which is what is shown to the user
            setAllTasks(allTasks.map((t) => (t.task_id === updatedTask.task_id ? updatedTask : t)));
        } catch (error) {
            displayError(error, "toggle task completion status")
        }
    };

    const doFiltering = useCallback(async () => {
        getTasksAndTagsOfProperty(propertyId)
            .then((tasksWithTags) => {

                // filter the tasks the appropriate tasks
                let filtered = tasksWithTags.filter((task) => {
                    let passes = true;
                    if (selectedTags.length > 0) {
                        passes = passes && selectedTags.some((tag) => task.TasksWithTags.some((taskTag) => taskTag.tag_name === tag.tag_name));
                    }
                    if (selectedRooms.length > 0) {
                        passes = passes && selectedRooms.some((room) => task.room_id === room.room_id);
                    }

                    if (selectedDueBefore.length > 0) {
                        const taskDue = new Date(task.due_date);
                        const selectedDueBeforeDate = new Date(selectedDueBefore);
                        passes = passes && taskDue < selectedDueBeforeDate;
                    }

                    return passes;
                })
                if (selectedSort && sortOptions.has(selectedSort)) {
                    filtered.sort(sortOptions.get(selectedSort));
                }
                setAggregatedTasks(filtered);
            })
            .catch((err) => displayError(err, "fetch tasks and their corresponding tags"));
    }, [propertyId, selectedSort, selectedRooms, selectedTags, selectedDueBefore]);

    // any time the list of tasks changes, we need to re-filter
    // (also, display all tasks upon loading the page for the first time)
    useEffect(() => {
        doFiltering();
    }, [propertyId, allTasks, doFiltering])

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
                    <SortFilterPopup
                        propertyId={propertyId}
                        sortOptions={Array.from(sortOptions.keys())}

                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        selectedRooms={selectedRooms}
                        setSelectedRooms={setSelectedRooms}
                        selectedDueBefore={selectedDueBefore}
                        setSelectedDueBefore={setSelectedDueBefore}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                    />

                    <AddButton src={addbuttonsvg} onClick={() => navigate("add")}></AddButton>
                </FilterandSortContainer>
                <TasksSection
                    sectionLabel='To Do'
                    tasks={aggregatedTasks.filter((task) => !task.completed)}
                    handleClick={
                        (task) => navigate("edit-task/" + task.task_id)
                    }
                    handleBoxClick={handleToggleTask}
                    noTaskMsg="No Tasks 🎉"
                />
                <TasksSection
                    sectionLabel="Completed"
                    tasks={aggregatedTasks.filter((task) => task.completed)}
                    handleClick={
                        (task) => navigate("edit-task/" + task.task_id)
                    }
                    handleBoxClick={handleToggleTask}
                    noTaskMsg="No Tasks Completed Yet 🏗️"
                />
                <div style={{ color: 'grey', fontSize: '.8rem' }}>
                    {allTasks.length - aggregatedTasks.length > 0 && <em>({allTasks.length - aggregatedTasks.length} tasks filtered out)</em>}
                </div>
            </TaskContainer>
            <Routes>
                <Route path="add" element={
                    <Popup
                        onClickOutside={() => navigate("")}
                        onKeyboardEsc={() => navigate("")}
                        element={<AddEditTask goBack={() => navigate("")} property_id={propertyId} />}
                    />
                } />
                <Route path="edit-task/:taskid/*" element={
                    <Popup
                        onClickOutside={() => navigate("")}
                        onKeyboardEsc={() => navigate("")}
                        element={<AddEditTask goBack={() => navigate("")} property_id={propertyId} />}
                    />
                } />
            </Routes>
        </>
    )
}

export default Page2

const sortOptions = new Map([
    ["Due date", (
        a: Database['public']['Tables']['Tasks']['Row'],
        b: Database['public']['Tables']['Tasks']['Row']
    ) => (Date.parse(a.due_date) > Date.parse(b.due_date) ? 1 : -1)],
    ["Title", (
        a: Database['public']['Tables']['Tasks']['Row'],
        b: Database['public']['Tables']['Tasks']['Row']
    ) => (a.title.localeCompare(b.title))]
]);

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
export const DropdownStyling = {
    '&:hover': {
        backgroundColor: 'white',
        border: '1px solid black',
        boxSizing: ''
    },
    '&:active': {
        backgroundColor: 'black'
    },
    backgroundColor: '#D9D9D9',
    color: '#5F5F5F',
    width: '100px',
    height: '40px',
    padding: '10px 0',
    fontSize: '14px',
    margin: '5px 0 0 0',
    cursor: 'pointer',
    borderRadius: '40px',
    textAlign: 'center'
}