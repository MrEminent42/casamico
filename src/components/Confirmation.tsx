import React from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

interface ConfirmationProps {
    confirmationText: string;
    doConfirmed: (...args: any[]) => void;
    goBack: () => void;
}

// generalized confirmation screen to be used in a Pop-up component.
// assumes there is a parameter :id in the URL!
const Confirmation = ({confirmationText, goBack, doConfirmed} : ConfirmationProps) => {
    const params = useParams();

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"} }>
            <ConfirmationText>
                {confirmationText}
            </ConfirmationText>
            <ButtonContainer>
                <CancelButton
                    onClick={goBack}>
                    Cancel
                </CancelButton>
                <SubmitButton
                    onClick={() => {
                            if (params.id)
                                doConfirmed(+params.id);
                            else {
                                alert("No id provided");
                                goBack();
                            }
                        }
                    }>
                    Yes
                </SubmitButton>
            </ButtonContainer>
        </div>
    )
}

export default Confirmation

const ConfirmationText = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #4c4c4c;
    text-align: center;
    margin: 15px 15px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    width: 60%;
    //border: 1px solid black;
`

const SubmitButton = styled.button`
    background-color: #e0f4dc;
    color: #5f6f67;
    font-weight: bold;
    padding: 10px 30px;
    margin: 5px 10px;
    min-width: 40%;

    //border
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // on hover, darken color
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
    min-width: 40%;

    //border
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1); 
    transition: 0.3s ease-in-out;

    // on hover, darken color
    // also, cursor should change to a pointer to indicate clickable
    &:hover {
        cursor: pointer;
        background-color: #e4d0d0;
    }
`