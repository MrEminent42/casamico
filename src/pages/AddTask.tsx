import React from 'react'
import styled from 'styled-components'
import { addTask } from '../controllers/TaskController';

const AddTaskPage = (props: { goBack: () => void }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTask();
        props.goBack();
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
                <StatusCheckbox type="checkbox" />
            </GridItemCol1Span>

            {/* Row 2 */}
            <GridItemCol1>
                <TitleAndText title="Name" name="name" />
            </GridItemCol1>
            <GridItemCol2>
                <TitleAndText title="Due Date" name="date" />
            </GridItemCol2>

            {/* Row 3 */}
            <GridItemCol1Span>
                <TitleAndTextArea title="Description" name="description" />
            </GridItemCol1Span>

            {/* Row 4 */}
            <GridItemCol1>
                <TitleAndText title="Tags" name="" />
            </GridItemCol1>
            <GridItemCol2>
                <TitleAndText title="Rooms" name="" />
            </GridItemCol2>

            {/* Row 5 */}
            <SubmitButtonsContainer>
                <SubmitButton type='submit'>
                    Save
                </SubmitButton>
            </SubmitButtonsContainer>
        </AddPropertyForm>
    )
}

export default AddTaskPage


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

// const TitleAndFile = (props: TitleAndInputProps) => {
//     return (
//         <label>
//             {props.title}
//             <FileInputArea title={props.title} name={props.name} />
//         </label>
//     )
// }

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

// const FileInputArea = (props: TitleAndInputProps) => {
//     return (
//         <div>
//             <input name={props.name} type="file" accept="image/*" id="input-file-upload" style={{ display: "none" }} />
//             <FileInputDiv>
//                 <label id="label-file-upload" htmlFor="input-file-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                     <img src={uploadImage} alt="upload icon" style={{ height: 25 }} />
//                     <div style={{ textAlign: "center", margin: 5 }}> Drag & Drop </div>
//                 </label>
//             </FileInputDiv>
//         </div>
//     )
// }

const StatusCheckbox = styled.input`
    border: 5px solid red;
    height: 1.5rem;
    width: 1.5rem;
`

// const FileInputDiv = styled.div`
//     margin: 10px 0px;
//     border-radius: 5px;
//     background-color: #eeeeee;
//     color: #a5a5a5;
//     height: 100px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

const AddPropertyForm = styled.form`
    color: gray;
    margin: 0px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 0.3fr 0.5fr 0.5fr 0.5fr 0.3fr;
    gap: 10px 20px;
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