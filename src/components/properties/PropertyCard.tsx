import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropertyGridItemPadding } from '../../pages/Home';
import { getTasksOfProperty } from "../../controllers/GetTasksOfPropertyController";
import { Database } from '../../supabase/supabase';
import { displayError } from '../../App';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


interface PropertyCardProps {
    property: Database['public']['Tables']['Properties']['Row'];
}

const PropertyCard = (props: PropertyCardProps) => {
    return (
        <PropertyGridItemPadding>
            <PropertyCardContents {...props} />
        </PropertyGridItemPadding>
    )
}

const PropertyCardContents = (props: PropertyCardProps) => {
    let { address, image_url, property_id } = props.property;
    let navigate = useNavigate();
    const [tasks, setTasks] = useState<Database['public']['Tables']['Tasks']['Row'][]>([]);

    useEffect(() => {
        getTasksOfProperty(property_id).then((tasks) => {
            setTasks(tasks);
        }).catch((error) => displayError(error, "fetch # tasks of property"));
    }, [property_id]);

    return (
        <div style={{ position: "relative" }}>
            <PropertyCardContainer
                onClick={() => {
                    navigate("/property/" + property_id);
                }}
            >
                <PropertyImageWrapper>
                    <PropertyImage src={image_url} />
                </PropertyImageWrapper>

                {/* Wrapper container for Property Card title and text so that clicking it also links to Tasks page */}
                <div>
                    <CardTitle>
                        {address}
                    </CardTitle>
                    <CardText>
                        {tasks.length} tasks
                    </CardText>
                </div>
            </PropertyCardContainer>
            <ButtonsContainer>
                <EditButton
                    onClick={(e: React.MouseEvent) => {
                        navigate("/edit-property/" + property_id);
                        e.stopPropagation();
                    }}
                >
                    <EditButtonDiv>
                        <EditRoundedIcon htmlColor="#5f6f67" />
                    </EditButtonDiv>
                </EditButton>
                <DeleteButton
                    onClick={(e: React.MouseEvent) => {
                        navigate("/delete-property/"+property_id);
                        e.stopPropagation();
                        }
                    }
                >
                    <DeleteButtonDiv>
                        <DeleteForeverRoundedIcon htmlColor="#6f5f5f" />
                    </DeleteButtonDiv>
                </DeleteButton>
            </ButtonsContainer>
        </div>
    )
}

export default PropertyCard

// to contain the image, title, and text, etc.
const PropertyCardContainer = styled.button`
    display: flex;
    flex-direction: column;
    width:100%;
    background: inherit;
    border: none;

    // cursor should change to a pointer to indicate clickable
    cursor: pointer;
`
const PropertyImage = styled.img`
    // prevent image from overflowing
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const PropertyImageWrapper = styled.div`
    // prevent image from overflowing
    width: 100%;
    height: 250px;

    // extra space so image can grow a bit
    margin-bottom: 10px;

    // add a nice-looking border radius and shadow
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // prevent overflow
    overflow: hidden;

    // on hover, "raise" it by scaling the image up a bit, 
    // and making more shadow.
    &:hover {
        transform: scale(1.03);
        box-shadow: 2px 2px 20px rgba(0,0,0,0.2);
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: right;

    // layer edit button over the property card wrapper in parent div to avoid nesting buttons
    position: absolute;
    top: 85%;
    z-index: 1;
    right: 10px;
`

const EditButton = styled.button`
    background: none;
    border-radius: 5px;
    border: none;
    padding: 0px;
    margin-right: 10px;

    // cursor should change to a pointer to indicate clickable
    cursor: pointer;
`

const EditButtonDiv = styled.div`
    background: #e0f4dc;
    border-radius: 7px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    width: 100%;
    padding: 2px;
    padding-bottom: 0px;
    padding-right: 1px;

    transition: 0.3s ease-in-out;

    &:hover {
        background: #d0e4cc;
    }
`

const DeleteButton = styled.button`
    background: none;
    border-radius: 5px;
    border: none;
    padding: 0px;
    margin-left: 10px;

    // cursor should change to a pointer to indicate clickable
    cursor: pointer;
`

const DeleteButtonDiv = styled.div`
    background: #f4e0e0;
    border-radius: 7px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    width: 100%;
    padding: 2px;
    padding-bottom: 0px;
    padding-right: 1px;

    transition: 0.3s ease-in-out;

    &:hover {
        background: #e4d0d0;
    }
`

const CardTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 5px 0px;
    color: #4c4c4c;
    text-align: left;
    -ms-word-break: break-word;
    word-break: break-word;
    white-space: pre-wrap;
`

const CardText = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
    color: grey;
    text-align: left;
`