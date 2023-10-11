import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard';

const AddPropertyPage = () => {
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/")
    }

    return (
        <div>
            <h3> New Property </h3>
            <AddPropertyForm onSubmit={handleSubmit}>
                <GridItemCol12>
                    <TitleAndText title="Street Address" name="address" />
                </GridItemCol12>
                <PreviewContainer>
                    Preview:
                    <PreviewBorderContainer>
                        <PropertyCard
                            address="Preview Address"
                            image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                            numTasks={0}
                        />
                    </PreviewBorderContainer>
                </PreviewContainer>
                <GridItemCol1>
                    <TitleAndText title="City" name="city" />
                </GridItemCol1>
                <GridItemCol2>
                    <TitleAndText title="State/Province" name="state" />
                </GridItemCol2>
                <GridItemCol1>
                    <TitleAndText title="Country" name="country" />
                </GridItemCol1>
                <GridItemCol2>
                    <TitleAndText title="Photo" name="photo" />
                    <SubmitButton style={{ width: "25%", marginLeft: "75%" }}>Browse</SubmitButton>
                </GridItemCol2>
                <GridItemCol12>
                    <TitleAndText title="Rooms" name="rooms" />
                </GridItemCol12>
                <SubmitButtonsContainer>
                    <SubmitButton>
                        Save
                    </SubmitButton>
                    <SubmitButton>
                        Exit Without Saving
                    </SubmitButton>
                </SubmitButtonsContainer>
            </AddPropertyForm>
        </div>
    )
}

export default AddPropertyPage


const TitleAndText = (props: TitleTextProps) => {
    return (
        <div>
            <div> {props.title} </div>
            <input name={props.name} style={{ width: "100%", margin: 10 }} />
        </div>
    )
}

interface TitleTextProps {
    title: string;
    name: string;
}

const AddPropertyForm = styled.form`
    color: black;
    margin: 0px 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`

const GridItemCol1 = styled.div`
    grid-column-start: 1;
    margin-right: 5%;
`

const GridItemCol2 = styled.div`
    grid-column-start: 2;
    margin-right: 5%;

`

const GridItemCol12 = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    margin-right: 2.5%;
`

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 4;
    pointer-events: none;
`

const PreviewBorderContainer = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
`

const SubmitButton = styled.button`
    type: submit;
    background-color: #77c855;
    color: white;
    padding: 10px;
    width: 50%;
    margin: 5px auto;
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
`