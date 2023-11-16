import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getTask } from '../controllers/GetTaskController';
import { updateTask } from "../controllers/UpdateTaskController";
import { addTask } from "../controllers/AddTaskController";
import { getTags, getTag } from '../controllers/GetTagController';
import { createTag } from "../controllers/CreateTagController";
import AsyncCreateableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { getRooms, getRoom } from '../controllers/GetRoomController';
import { Database } from '../supabase/supabase';
import { Link, useParams } from 'react-router-dom';
import ColorPickerCard from '../components/ColorPickerCard';
import { addTaskWithTags, getTagsOfTask, deleteTagsOfTask } from '../controllers/TasksWithTagsController';
import { displayError } from '../App';


interface AddTaskProps {
    goBack: () => void;
    property_id: Database['public']['Tables']['Properties']['Row']['property_id'];
}

const AddTask = (props: AddTaskProps) => {
    const params = useParams();

    const [selectedTags, setSelectedTags] = useState<readonly Database['public']['Tables']['Tags']['Row'][]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Database['public']['Tables']['Rooms']['Row'] | null>();
    const [selectedColor, setSelectedColor] = useState<string>("#fca5a5");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [done, setDone] = useState(false);
    const [taskId, setTaskId] = useState<number | null>(null);

    const colors = [
        { hex: "#fca5a5" },
        { hex: "#fdba74" },
        { hex: "#fde047" },
        { hex: "#d9f99d" },
        { hex: "#6ee7b7" },
        { hex: "#67e8f9" },
        { hex: "#93c5fd" },
        { hex: "#c4b5fd" },
        { hex: "#f0abfc" },
    ];

    useEffect(() => {
        if (params.taskid) {
            setTaskId(+params.taskid);
        }
    }, [params])

    // if the task already exists, populate the fields
    useEffect(() => {
        async function fillBoxes(task_id: number) {
            const task = await getTask(task_id);
            setTitle(task.title);
            setDueDate(task.due_date);
            setDescription(task.description);
            setDone(task.completed);
            setSelectedColor(task.color)

            const room = await getRoom(task.room_id);
            setSelectedRoom(room);

            const tags_of_task = await getTagsOfTask(task_id);
            const tags = await Promise.all(tags_of_task.map(async (tag_of_task) => {
                return await getTag(tag_of_task.tag_name);
            }));
            setSelectedTags(tags);
        }

        if (taskId) {
            fillBoxes(taskId);
        }

    }, [taskId])


    const handleColorClick = (color: string) => {
        setSelectedColor(color);
    }

    const updateTagsIfNecessary = async () => {
        // compare selected tasks against existing tags
        // if any are not in the db, add them

        const dbTagsNames = await getTags();

        if (!dbTagsNames) {
            return Promise.reject(new Error("Problem getting tags."));
        }

        const dbTagSet = new Set(dbTagsNames.map((tag) => tag.tag_name));

        await Promise.all(selectedTags.map(async (tag) => {
            if (!dbTagSet.has(tag.tag_name)) {
                return await createTag(tag.tag_name.trim());
            }
        })).catch((err) => {
            // if any of the createTag promises reject, reject this individual promise
            return Promise.reject(err || "Error creating tags.");
        }).catch((err) => {
            // re-throw any error caught from createTag (I hope)
            throw new Error(err);
        })
        return Promise.resolve("Created tags successfully.");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedRoom) {
            alert("You must select a room.");
            return;
        }

        if (!dueDate) {
            alert("You must select a due date.");
            return;
        }

        try {
            await updateTagsIfNecessary();
        } catch (err) {
            displayError(err, "create/update tags");
            return;
        }

        const task: Database['public']['Tables']['Tasks']['Insert'] = {
            description: description,
            title: title,
            due_date: dueDate,
            property_id: props.property_id,
            room_id: selectedRoom.room_id,
            color: selectedColor,
            completed: done,
        }

        let taskId: Database['public']['Tables']['Tasks']['Row']['task_id'];

        try {
            if (params.taskid) {
                taskId = await updateTask(task, +params.taskid);
                await deleteTagsOfTask(+params.taskid);
            } else {
                taskId = await addTask(task);
            }
        } catch (err) {
            displayError(err, "add/edit task")
            return;
        } finally {
            props.goBack();
        }

        let curr_tag_rows = await getTagsOfTask(taskId);
        let curr_tags = await Promise.all(curr_tag_rows.map(async (tag_name) => {
            return (await getTag(tag_name.tag_name)).tag_name;
        }));
        await Promise.all(selectedTags.map(async (tag) => {
            if (curr_tags.includes(tag.tag_name)) {
                // tag is already in the db
                return;
            }
            const taskWithTag: Database['public']['Tables']['TasksWithTags']['Insert'] = {
                task_id: taskId,
                tag_name: tag.tag_name,
            }
            return await addTaskWithTags(taskWithTag);
        })).catch((err) => {
            displayError(err, "set tags for task")
            props.goBack();
        })
    }

    const renderNoRooms = () => {
        return <div>No rooms found. <Link to={"/"}>Create a new room first.</Link></div>
    }

    return (
        <AddPropertyForm onSubmit={handleSubmit}>
            {/* Row 0 */}
            <GridItemCol1Span>
                <h3> Add Task </h3>
            </GridItemCol1Span>

            {/* Row 1 */}
            <GridItemCol1Span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Completed?
                <StatusCheckbox type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />
            </GridItemCol1Span>

            {/* Row 2 */}
            <GridItemCol1>
                <label>
                    Title
                    <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
            </GridItemCol1>
            <GridItemCol2>
                <label>
                    Due date
                    <TextInput value={dueDate} onChange={(e) => setDueDate(e.target.value)} type='date' />
                </label>
            </GridItemCol2>

            {/* Row 3 */}
            <GridItemCol1Span>
                <label>
                    Room
                    <AsyncSelect
                        value={selectedRoom}
                        cacheOptions
                        defaultOptions
                        loadOptions={() => getRooms(props.property_id)}
                        noOptionsMessage={renderNoRooms}
                        onChange={(selected) => setSelectedRoom(selected)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.name}
                        filterOption={(option, inputValue) => {
                            if (option.data.name.toLowerCase().includes(inputValue.toLowerCase())) {
                                return true;
                            }
                            return false;
                        }}
                        styles={DropdownStyles}
                    />

                </label>
            </GridItemCol1Span>

            {/* Row 4 */}
            <GridItemCol1Span>

                Tag
                <AsyncCreateableSelect
                    value={selectedTags}
                    isMulti
                    cacheOptions
                    createOptionPosition='first'
                    defaultOptions
                    loadOptions={getTags}
                    noOptionsMessage={() => "Type to create a new tag..."}
                    onChange={(selected) => setSelectedTags(selected)}
                    getOptionLabel={(option) => option.tag_name}
                    getOptionValue={(option) => option.tag_name}
                    getNewOptionData={(option, inputValue) => ({ tag_name: "" + inputValue, created_at: '' })}
                    formatCreateLabel={(inputValue) => `Create tag: ${inputValue}`}
                    filterOption={(option, inputValue) => {
                        if (option.data.tag_name.toLowerCase().includes(inputValue.toLowerCase())) {
                            return true;
                        }
                        return false;
                    }}
                    styles={DropdownStyles}
                />
            </GridItemCol1Span>

            {/* Row 5 */}
            <GridItemCol1Span>
                <label>
                    Description
                    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </GridItemCol1Span>

            {/* Row 6 */}
            <GridItemCol1Span>

                Color Picker
                <ColorPickerContainer>
                    {colors.map((color) => {
                        return (
                            <ColorPickerCard
                                key={color.hex}
                                color={color.hex}
                                selected={selectedColor === color.hex}
                                handleColorClick={handleColorClick}
                            />
                        )
                    })}
                </ColorPickerContainer>

            </GridItemCol1Span>

            {/* Row 7 */}
            <SubmitButtonsContainer>
                <SubmitButton type='submit'>
                    Save
                </SubmitButton>
            </SubmitButtonsContainer>


        </AddPropertyForm>
    )
}

export default AddTask

const TextInput = styled.input`
    width: 100%;
    margin: 10px 0px;
    border: none;
    border-radius: 5px;
    background-color: #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    color: gray;
    font-weight: bold;
    
    // sync with Dropdowns
    min-height: 38px;
`

const TextArea = styled.textarea`
    width: 100%;
    margin: 10px 0px;
    border: none;
    border-radius: 5px;
    background-color: #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    color: gray;
    font-weight: bold;
    resize: none;
    height: 50px;
`

const StatusCheckbox = styled.input`
    border: 5px solid red;
    height: 1.5rem;
    width: 1.5rem;
`

const AddPropertyForm = styled.form`
    color: gray;
    margin: 0px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3rem 3rem 5rem 5rem 5rem 6rem;
    gap: 10px 20px;
    width: 700px;
    height: 85vh;
`

const GridItemCol1 = styled.div`
    grid-column-start: 1;
`

const GridItemCol2 = styled.div`
    grid-column-start: 2;
`

const GridItemCol1Span = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    max-width: 100%;
`

const SubmitButton = styled.button`
    background-color: #e0f4dc;
    color: #5f6f67;
    font-weight: bold;
    padding: 10px 30px;
    margin: 5px 0px 5px auto;
    grid-column-start: 3;

    //border
    border: none;
    border-radius: 10px;
    transition: 0.3s ease-in-out;

    // on hover cursor should change to a pointer
    // and color should darken to indicate clickable
    &:hover {
        cursor: pointer;
        background-color: #d0e4cc;
    }
`

const SubmitButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 3;
    margin: 0 0 15px 0;
`

const ColorPickerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
`

const DropdownStyles = {
    control: (baseStyles: any) => ({
        ...baseStyles,
        color: 'gray',
        backgroundColor: '#eeeeee',
        border: 'none',
        margin: '10px 0px',
    }),
    valueContainer: (baseStyles: any) => ({
        ...baseStyles,
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: 'ellipsis',
    }),
    multiValue: (baseStyles: any) => ({
        ...baseStyles,
        backgroundColor: '#d1d1d1',
    }),
}