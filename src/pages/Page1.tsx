import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard';

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
        <div>
            <AddPropertyForm onSubmit={handleSubmit}>
                <GridItemCol12>
                    <h3> New Property </h3>
                </GridItemCol12>
                <GridItemCol12>
                    <TitleAndText title="Street Address" name="address" />
                </GridItemCol12>
                <PreviewContainer>
                    <h3>Preview</h3>
                    <PropertyCard
                        address="Preview Address"
                        image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                        numTasks={0}
                        setSelectedProperty={props.setSelectedProperty}
                    />
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
                    <TitleAndText title="Photo" name="photo" />
                </GridItemCol12>
                <SubmitButtonsContainer>
                    <SubmitButton>
                        Save
                    </SubmitButton>
                    <SubmitButton>
                        Exit Without Saving
                    </SubmitButton>
                </SubmitButtonsContainer>
                <GridItemCol12>
                    <TitleAndText title="Rooms" name="rooms" />
                </GridItemCol12>
            </AddPropertyForm>
        </div>
    )
}

export default AddPropertyPage


const TitleAndText = (props: TitleTextProps) => {
    return (
        <div>
            <div> {props.title} </div>
            <TextInput name={props.name}/>
        </div>
    )
}

interface TitleTextProps {
    title: string;
    name: string;
}

const TextInput = styled.input`
    width: 100%;
    margin: 10px 0px;
    box-sizing: border-box;
    webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
`

const AddPropertyForm = styled.form`
    color: gray;
    margin: 0px 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.5fr 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    border: 1px dotted black;
`

const GridItemCol1 = styled.div`
    grid-column-start: 1;
    margin-right: 5%;
    border: 1px dotted black;
`

const GridItemCol2 = styled.div`
    grid-column-start: 2;
    margin-right: 5%;
    border: 1px dotted black;
`

const GridItemCol12 = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    margin-right: 2.5%;
    border: 1px dotted black;
`

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 6;
    pointer-events: none;
    border: 1px dotted black;
`

const SubmitButton = styled.button`
    type: submit;
    background-color: #77c855;
    color: white;
    padding: 10px;
    width: 50%;
    margin: 5px 0px;
    grid-column-start: 3;

    //border
    border: 2px solid #97e875;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // on hover, "raise" it by scaling the image up a bit, 
    // and making more shadow.
    // also, cursor should change to a pointer to indicate clickable
    &:hover {
        cursor: pointer;
        border: 2px solid #87d865;
        background-color: #67b845;
    }
`

const SubmitButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column-start: 3;
    grid-row-start: 6;
    border: 1px dotted black;
`