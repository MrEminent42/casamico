import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropertyGridItemPadding } from '../../pages/Home';
import { getTasksOfProperty } from '../../controllers/TaskController';
import { Database } from '../../supabase/supabase';
import EditRoundedIcon from '@mui/icons-material/EditRounded';


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
        }).catch((error) => {
            alert(JSON.stringify(error));
        });
    }, [property_id]);

    return (
        <PropertyCardContainer
            onClick={() => {
                navigate("/property/" + property_id);
            }}
        >
            <PropertyImageWrapper>
                <PropertyImage src={image_url} />
            </PropertyImageWrapper>

            {/* Wrapper container for Property Card title and text and buttons so that clicking it also links to Tasks page */}
            <div style={{ display: "flex", width: "100%" }}>
                { /* container for text (address and number of tasks) under property image */ }
                <div style={{ flexGrow: 1 } }>
                    <CardTitle>
                        {address}
                    </CardTitle>
                    <CardText>
                        {tasks.length} tasks
                    </CardText>
                </div>
                <EditButton
                    onClick={(e: React.MouseEvent) => {
                        navigate("/edit-property/" + property_id);
                        e.stopPropagation();
                    }}
                >
                    <EditButtonDiv>
                        <EditRoundedIcon htmlColor="#5f6f67"/>
                    </EditButtonDiv>
                </EditButton>
            </div>
        </PropertyCardContainer>
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

const EditButton = styled.button`
    background: none;
    border-radius: 5px;
    border: none;
    right: 10px;
    top: 10px;
    z-index: 1;
    padding: 0;

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
        cursor: pointer;
        transform: scale(1.04);
        background: #d0e4cc;
    }
`

const CardTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 5px 0px;
    color: #4c4c4c;
    text-align: left;
`

const CardText = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
    color: grey;
    text-align: left;
`