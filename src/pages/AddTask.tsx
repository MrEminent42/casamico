import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addTask } from '../controllers/TaskController';
import TaskTagsDropdown from '../components/tasks/TaskRoomsDropdown';
import { Tag } from '../Types';
import { createTag, getTags } from '../controllers/TagController';
import AsyncCreateableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { getRooms } from '../controllers/RoomController';
import { Database } from '../supabase/supabase';

interface AddTaskProps {
    goBack: () => void;
    property_id: Database['public']['Tables']['Properties']['Row']['property_id'];
}

const AddTask = (props: AddTaskProps) => {

    const [dbTags, setDbTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<readonly Database['public']['Tables']['Tags']['Row'][]>([]);
    const [selectedRooms, setSelectedRooms] = useState<readonly Database['public']['Tables']['Rooms']['Row'][]>([]);

    // const handleTagsChange = (selected: Database['public']['Tables']['Tags']['Row'][]) => {
    //     setSelectedTags(selected);
    // }

    // const handleRoomsChange = (selected: Database['public']['Tables']['Rooms']['Row'][]) => {
    //     setSelectedRooms(selected);
    // }


    const updateTagsIfNecessary = async () => {
        // compare selected tasks against existing tags
        // if any are not in the db, add them
        const dbTagsNames = new Set();
        dbTags.forEach((tag) => {
            dbTagsNames.add(tag.tag_name);
        })

        const res = await Promise.all(selectedTags.map((tag) => {
            if (!dbTagsNames.has(tag.tag_name)) {
                return createTag(tag.tag_name);
            }
        })).catch((err) => {
            return Promise.reject(err || "Error creating tags.");
        })
        return Promise.resolve("Created tags successfully.");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            let res = await updateTagsIfNecessary();
            alert(res);
        } catch (err) {
            alert(err);
            return;
        }

        const task: Database['public']['Tables']['Tasks']['Insert'] = {
            property_id: props.property_id,
            title: event.currentTarget.name,
            description: event.currentTarget.description.value,
            due_date: event.currentTarget.date.value,
            done: false,
        }

        addTask(task).catch((err) => { alert(err) }).then(() => props.goBack());
    }

    return (
        <AddPropertyForm onSubmit={handleSubmit}>
            {/* Row 0 */}
            <GridItemCol1Span>
                <h3> Add Task </h3>
            </GridItemCol1Span>

            {/* Row 1 */}
            <GridItemCol1Span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Status
                <StatusCheckbox type="checkbox" name="done" />
            </GridItemCol1Span>

            {/* Row 2 */}
            <GridItemCol1>
                <TitleAndText title="Name" name="name" />
            </GridItemCol1>
            <GridItemCol2>
                <TitleAndText title="Due Date" name="date" />
            </GridItemCol2>


            <GridItemCol1Span>
                {/* <TitleAndText title="Rooms" name="" /> */}
                Room
                {/* <TaskTagsDropdown
                    loadOptions={getTags}
                    onChange={handleTagsChange}
                /> */}
                <AsyncSelect
                    isMulti={true}
                    cacheOptions
                    defaultOptions
                    loadOptions={() => getRooms(props.property_id)}
                    noOptionsMessage={() => "Type to create a new tag..."}
                    onChange={(selected) => setSelectedRooms(selected)}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    // getNewOptionData={(inputValue, optionLabel) => ({ tag_name: optionLabel as string, created_at: '' })}
                    // getNewOptionData={(inputValue, optionLabel) => ({ tag_name: inputValue, created_at: '' })}
                    filterOption={(option, inputValue) => {
                        if (option.data.name.toLowerCase().includes(inputValue.toLowerCase())) {
                            return true;
                        }
                        return false;
                    }}
                    styles={DropdownStyles}
                />

            </GridItemCol1Span>

            {/* Row 4 */}
            <GridItemCol1Span>
                {/* <TaskTagsDropdown
                    loadOptions={getTags}
                    onChange={handleTagsChange}
                /> */}

                Tag
                <AsyncCreateableSelect
                    isMulti={true}
                    cacheOptions
                    defaultOptions
                    loadOptions={getTags}
                    noOptionsMessage={() => "Type to create a new tag..."}
                    onChange={(selected) => setSelectedTags(selected)}
                    getOptionLabel={(option) => option.tag_name}
                    getOptionValue={(option) => option.tag_name}
                    // getNewOptionData={(inputValue, optionLabel) => ({ tag_name: optionLabel as string, created_at: '' })}
                    getNewOptionData={(inputValue, optionLabel) => ({ tag_name: inputValue, created_at: '' })}
                    formatCreateLabel={(inputValue) => `Create tag: "${inputValue}"`}
                    filterOption={(option, inputValue) => {
                        if (option.data.tag_name.toLowerCase().includes(inputValue.toLowerCase())) {
                            return true;
                        }
                        return false;
                    }}
                    styles={DropdownStyles}
                />

            </GridItemCol1Span>

            {/* Row 3 */}
            <GridItemCol1Span>
                <TitleAndTextArea title="Description" name="description" />
            </GridItemCol1Span>

            {/* Row 5 */}
            <SubmitButtonsContainer>
                <SubmitButton type='submit'>
                    Save
                </SubmitButton>
            </SubmitButtonsContainer>
        </AddPropertyForm>
    )
}

export default AddTask


const TitleAndText = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <TextInput name={props.name} type={props.type} style={props.style} />
        </label>
    )
}

const TitleAndTextArea = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <TextArea name={props.name} style={props.style} />
        </label>
    )
}

interface TitleAndInputProps {
    title: string;
    name: string;
    type?: string;
    longText?: boolean;
    style?: React.CSSProperties;
}

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
    height: 100px;
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
    grid-template-rows: 5rem 3rem 5rem 5rem 5rem 9rem;
    gap: 10px 20px;
    width: 700px;
    height: 80vh;
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
    margin: 5px 10px;
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
    align-items: end;
    justify-content: end;
    grid-column-start: 2;
    margin: 0;
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