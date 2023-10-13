import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/properties/PropertyCard';
import uploadIcon from '../assets/upload.png';
import { Property } from '../Types';
import { createProperty, getPropertyPhotoUrl } from '../controllers/PropertyController';

const AddPropertyPage = () => {
    let navigate = useNavigate();

    const [newProperty, setNewProperty] = useState<Property>({ image_url: getPropertyPhotoUrl('default_house.png') } as Property);
    const [newRooms, setNewRooms] = useState("");

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setNewProperty(values => ({ ...values, [name]: value }) as Property)
    }

    const handleRoomsChange = (event: FormEvent<HTMLInputElement>) => {
        setNewRooms(event.currentTarget.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`Entered Propery with following attributes:\n
            ${newProperty ?
            (newProperty.address ? newProperty.address : "undef address") + "\n" +
            (newProperty.city ? newProperty.city : "undef city") + "\n" +
            (newProperty.state_province ? newProperty.state_province : "undef state") + "\n" +
            (newProperty.country ? newProperty.country : "undef country") + "\n" +
            (newProperty.image_url ? newProperty.image_url : "undef image url") + "\n" +
            newRooms
            : "undef property"
            }`);
        createProperty(newProperty)
            .catch(err => alert(`error in createProperty: ${err}`));
        navigate("/");
    }

    return (
        <AddPropertyForm onSubmit={handleSubmit}>
            <GridItemCol12>
                <h3> Property Information </h3>
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndText title="Street Address" name="address" value={newProperty.address} handleChange={handleChange}/>
            </GridItemCol12>
            <PreviewContainer>
                <h3>Preview</h3>
                <label style={{ marginTop: 10, marginBottom: 10 }}>Card View</label>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <PropertyCard
                        property={newProperty}
                        noPadding
                    />
                </div>
            </PreviewContainer>
            <GridItemCol1>
                <TitleAndText title="City" name="city" value={newProperty.city} handleChange={handleChange} />
            </GridItemCol1>
            <GridItemCol2>
                <TitleAndText title="State/Province" name="state_province" value={newProperty.state_province} handleChange={handleChange} />
            </GridItemCol2>
            <GridItemCol12>
                <TitleAndText title="Country" name="country" value={newProperty.country} handleChange={handleChange} />
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndFile title="Upload Photo" name="photo" value={newProperty.image_url} handleChange={handleChange} />
            </GridItemCol12>
            <SubmitButtonsContainer>
                <SubmitButton>
                    Save
                </SubmitButton>
            </SubmitButtonsContainer>
            <GridItemCol12>
                <TitleAndText title="Rooms" name="rooms" value={newRooms} handleChange={handleRoomsChange} />
            </GridItemCol12>
        </AddPropertyForm>
    )
}

export default AddPropertyPage


const TitleAndText = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <TextInput name={props.name} value={props.value || ""} onChange={props.handleChange} />
        </label>
    )
}

const TitleAndFile = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <FileInputArea title={props.title} name={props.name} handleChange={props.handleChange} />
        </label>
    )
}

interface TitleAndInputProps {
    title: string;
    name: string;
    value?: string;
    handleChange: (e: FormEvent<HTMLInputElement>) => void;
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
            <input name={props.name} type="file" accept="image/*" id="input-file-upload" style={{ display: "none" }} onChange={uploadIcon} />
            <FileInputDiv>
                <label id="label-file-upload" htmlFor="input-file-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={uploadIcon} alt="upload icon" style={{ height: 25 }} />
                    <div style={{ textAlign: "center", margin: 5 }}> Drag & Drop </div>
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