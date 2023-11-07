import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import uploadIcon from '../assets/upload.png';
import { createProperty, deletePropertyPhoto, getProperty, getPropertyPhotoUrl, storePropertyPhoto, updateProperty } from '../controllers/PropertyController';
import PropertyCardPreview from '../components/properties/PropertyCardPreview';
import { getRooms } from '../controllers/RoomController';

interface DummyProperty {
    address: string
    city?: string | null
    country?: string | null
    image_url: string
    state_province?: string | null
}

interface AddEditPropertyProps {
    goBack: () => void;
}

const AddEditProperty = (props: AddEditPropertyProps) => {
    const params = useParams();

    const [newProperty, setNewProperty] = useState<DummyProperty>({ image_url: getPropertyPhotoUrl('default_house.png') } as DummyProperty);
    const [newRooms, setNewRooms] = useState<string>();
    const [newPhoto, setNewPhoto] = useState<File>();
    const [preview, setPreview] = useState<string>();

    let oldPhoto = useRef("");

    //called from all form inputs except photo and room
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setNewProperty(values => ({ ...values, [name]: value }) as DummyProperty)
    }

    //called from room input
    const handleRoomsChange = (event: FormEvent<HTMLInputElement>) => {
        setNewRooms(event.currentTarget.value);
    }

    //called from photo input
    const uploadFile = async (event: FormEvent<HTMLInputElement>) => {
        //if files list is undef or empty, newPhoto is undef
        if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
            //if already have preview photo, don't want to change anything if no photo is selected after that
            if (newPhoto!==undefined) {
                return;
            }

            //if no photo has been selected yet and none is selected now, set to undef
            setNewPhoto(undefined);
            return;
        }

        // only selecting one image
        setNewPhoto(event.currentTarget.files[0]);
    }

    //on page load - prefill boxes if editing
    useEffect(() => {
        async function fillBoxes(property_id: number) {
            const fullProperty = await getProperty(property_id);
            oldPhoto.current = fullProperty.image_url;
            setNewProperty(fullProperty);

            const allRooms = await getRooms(property_id);
            let roomsString = "";
            allRooms.forEach(room => roomsString += room.name + ', ');
            roomsString = roomsString.substring(0, roomsString.length - 2);
            setNewRooms(roomsString);

        }

        if (params.id) {
            fillBoxes(+params.id);
        }
    }, [params.id])

    //called whenever newPhoto is changed
    //create a preview as a side effect, whenever selected file is changed to use in property card
    //must store photo and change newProperty image_url to url of stored photo later
    useEffect(() => {
        if (!newPhoto) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(newPhoto);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [newPhoto])

    //called whenever preview is changed
    //change newProperty to use this preview photo
    useEffect(() => {
        if (preview) {
            setNewProperty(values => ({ ...values, image_url: preview }) as DummyProperty);
        }
    }, [preview])

    const replacePhoto = async () => {
        let filename: string = "";
        if (newPhoto) {
            filename = await storePropertyPhoto(newPhoto)
                .catch(err => {
                    console.log(err);
                    alert(`error in storePropertyPhoto: ${err}`);
                    return "";
                });

            if (oldPhoto.current && oldPhoto.current !== getPropertyPhotoUrl('default_house.png')) {
                await deletePropertyPhoto(oldPhoto.current.substring(oldPhoto.current.lastIndexOf('/') + 1))
                    .catch(err => {
                        console.log(err);
                        alert(`error in storePropertyPhoto: ${err}`);
                    });
            }
        }
        return filename ? filename : "default_house.png";
    }

    const submitProperty = async (filename: string) => {
        //if id is defined, we are editing the property with that ID
        //otherwise we are adding a new property
        if (params.id) {
            updateProperty({ ...newProperty, image_url: newProperty.image_url.startsWith("https://ifgorfdgcwortivlypji.supabase.co/storage/") ? newProperty.image_url : getPropertyPhotoUrl(filename) }, newRooms ?? "")
                .catch(err => {
                    console.log(err);
                    alert(`error in updateProperty: ${err}`);
                });
        }
        else {
            createProperty({ ...newProperty, image_url: getPropertyPhotoUrl(filename) }, newRooms ?? "")
                .catch(err => {
                    console.log(err);
                    alert(`error in createProperty: ${err}`);
                });
        }
    }

    //called when submit button is pressed
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //store image to db on submit
        replacePhoto().then(
            (filename) => {
                //store property info to db
                if (newProperty.address) {
                    submitProperty(filename).then(
                        () => {
                            props.goBack();
                        }
                    )
                }
                else {
                    alert("Property street address is a required field");
                }
            }
        );
    }

    return (
        <AddEditPropertyForm onSubmit={handleSubmit}>
            <GridItemCol12>
                <h3> Property Information </h3>
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndText title="Street Address" name="address" value={newProperty.address} handleChange={handleChange}/>
            </GridItemCol12>
            <PreviewAndSubmitContainer>
                <PreviewContainer>
                    <h3>Preview</h3>
                    <label style={{ marginTop: 10, marginBottom: 10 }}>Card View</label>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <PropertyCardPreview
                            address={newProperty.address}
                            image_url={newProperty.image_url}
                        />
                    </div>
                </PreviewContainer>
                <SubmitButtonsContainer>
                    <CancelButton onClick={props.goBack}>Cancel</CancelButton>
                    <SubmitButton type="submit">Save</SubmitButton>
                </SubmitButtonsContainer>
            </PreviewAndSubmitContainer>
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
                <TitleAndFile title="Upload Photo" name="photo" handleChange={uploadFile} />
            </GridItemCol12>
            <GridItemCol12>
                <TitleAndText title="Rooms" name="rooms" value={newRooms} handleChange={handleRoomsChange} />
            </GridItemCol12>
        </AddEditPropertyForm>
    )
}

export default AddEditProperty


const TitleAndText = (props: TitleAndInputProps) => {
    return (
        <label>
            {props.title}
            <TextInput name={props.name!} value={props.value || ""} onChange={props.handleChange} />
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
    title: string | null;
    name: string | null;
    value?: string | null;
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
            <input name={props.name!} type="file" accept="image/*" id="input-file-upload" style={{ display: "none" }} onChange={props.handleChange} />
            <FileInputDiv>
                <label id="label-file-upload" htmlFor="input-file-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={uploadIcon} alt="upload icon" style={{ height: 25 }} />
                    <div style={{ textAlign: "center", margin: 5 }}> Click to Upload </div>
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

const AddEditPropertyForm = styled.form`
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
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 6;
    pointer-events: none;
    //border: 1px dotted black;
`

const PreviewAndSubmitContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 6;
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

const CancelButton = styled.button`
    background-color: #f4e0e0;
    color: #6f5f5f;
    font-weight: bold;
    padding: 10px 30px;
    margin: 5px 10px;

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
        background-color: #e4d0d0;
    }
`


const SubmitButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 76px;
`