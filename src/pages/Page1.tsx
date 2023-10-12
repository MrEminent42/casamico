import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/properties/PropertyCard';
import uploadImage from '../assets/upload.png';

interface AddEditPropertyProps {
    setSelectedProperty: (property: string) => void;
}

const AddPropertyPage = (props: AddEditPropertyProps) => {
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/")
    }

    return (
        <AddPropertyForm onSubmit={handleSubmit}>
            <GridItemCol12>
                <h3> Property Information </h3>
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndText title="Street Address" name="address" />
            </GridItemCol12>
            <PreviewContainer>
                <h3>Preview</h3>
                <label style={{ marginTop: 10, marginBottom:10 }}>Card View</label>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <PropertyCard
                        address="Preview Address"
                        image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                        numTasks={0}
                        noPadding
                        setSelectedProperty={props.setSelectedProperty}
                    />
                </div>
            </PreviewContainer>
            <GridItemCol1>
                <TitleAndText title="City" name="city" />
            </GridItemCol1>
            <GridItemCol2>
                <TitleAndText title="State/Province" name="state" />
            </GridItemCol2>
            <GridItemCol12>
                <TitleAndText title="Country" name="country" />
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndFile title="Upload Photo" name="photo" />
            </GridItemCol12>
            <SubmitButtonsContainer>
                <SubmitButton>
                    Save
                </SubmitButton>
            </SubmitButtonsContainer>
            <GridItemCol12>
                <TitleAndText title="Rooms" name="rooms" />
            </GridItemCol12>
        </AddPropertyForm>
    )
}

export default AddPropertyPage


const TitleAndText = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <TextInput name={props.name} />
        </label>
    )
}

const TitleAndFile = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title} 
            <FileInputArea title={props.title} name={props.name} />
        </label>
    )
}

interface TitleAndInputProps {
    title: string;
    name: string;
}

const TextInput = styled.input`
    width: 100%;
    margin: 10px 0px;
    border: none;
    border-radius: 5px;
    background-color: #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    color: gray;
    font-weight: bold;
`

const FileInputArea = (props: TitleAndInputProps) => {
    return (
        <div>
            <input name={props.name} type="file" accept="image/*" id="input-file-upload" style={{display: "none"}} />
            <FileInputDiv>
                <label id="label-file-upload" htmlFor="input-file-upload" style={{display:"flex", flexDirection:"column", alignItems:"center"} }>
                        <img src={uploadImage} alt="upload icon" style={{height:25}} />
                        <div style={{textAlign:"center", margin: 5}}> Drag & Drop </div>
                </label>
            </FileInputDiv>
        </div>
    )
}

const FileInputDiv = styled.div`
    margin: 10px 0px;
    border-radius: 5px;
    background-color: #eeeeee;
    color: #a5a5a5;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AddPropertyForm = styled.form`
    color: gray;
    margin: 0px 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr 0.5fr 0.5fr 1.5fr 1fr;
    gap: 10px;
    //border: 1px dotted black;
`

const GridItemCol1 = styled.div`
    grid-column-start: 1;
    margin-right: 5%;
    //border: 1px dotted black;
`

const GridItemCol2 = styled.div`
    grid-column-start: 2;
    margin-right: 5%;
    //border: 1px dotted black;
`

const GridItemCol12 = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    margin-right: 2.5%;
    //border: 1px dotted black;
`

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 6;
    pointer-events: none;
    //border: 1px dotted black;
`

const SubmitButton = styled.button`
    type: submit;
    background-color: #e0f4dc;
    color: #5f6f67;
    font-weight: bold;
    padding: 10px 30px;
    margin: 5px 10px;
    grid-column-start: 3;

    //border
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // on hover, "raise" it by scaling the image up a bit, 
    // and making more shadow.
    // also, cursor should change to a pointer to indicate clickable
    &:hover {
        cursor: pointer;
        background-color: #d0e4cc;
    }
`

const SubmitButtonsContainer = styled.div`
    display: flex;
    align-items: end;
    justify-content: end;
    grid-column-start: 3;
    grid-row-start: 6;
    //border: 1px dotted black;
`