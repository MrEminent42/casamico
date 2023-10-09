import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const AddPropertyView = () => {
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/")
    }

    return (
        <div>
            <h3> New Property </h3>
            <AddPropertyForm onSubmit={handleSubmit}>
                <GridItemCol1>
                    <TitleAndText title="Street Address" name="address" />
                </GridItemCol1>
                <GridItemCol2>
                    <TitleAndText title="City" name="city" />
                </GridItemCol2>
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
                    <TitleAndText title="State/Province" name="state" />
                </GridItemCol1>
                <GridItemCol2>
                    <TitleAndText title="Country" name="country" />
                </GridItemCol2>
                <GridItemCol1>
                    <TitleAndText title="Photo" name="photo" />
                </GridItemCol1>
                <GridItemCol2>
                    <TitleAndText title="Rooms" name="rooms" />
                </GridItemCol2>
                <SubmitButton>
                    Save
                </SubmitButton>
                <SubmitButton>
                    Exit Without Saving
                </SubmitButton>
            </AddPropertyForm>
        </div>
    )
}

const TitleAndText = (props: TitleTextProps) => {
    return (
        <div>
            <div> {props.title} </div>
            <input name={props.name}/>
        </div>
    )
}

interface TitleTextProps {
    title: string;
    name: string;
}

export default AddPropertyView

const AddPropertyForm = styled.form`
    color: black;
    margin: 0px 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`

const GridItemCol1 = styled.div`
    grid-column-start: 1;
`

const GridItemCol2 = styled.div`
    grid-column-start: 2;
`

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 4;
`

const PreviewBorderContainer = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
`

const SubmitButton = styled.button`
    type: submit;
    background-color: #4e82ad;
    color: white;
    padding: 10px;
    width: 50%;
    margin: auto;
    border: none;
    border-radius: 10px;
    grid-column-start: 3;
`