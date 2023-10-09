import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const AddPropertyView = () => {
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/")
    }

    return (
        <AddPropertyViewContainer>
            <AddPropertyForm onSubmit={handleSubmit}>
                <h3> New Property </h3>
                <p> Street Address </p>
                <AddressTextArea />
                <p> City </p>
                <input name="city"/>
                <p> State/Province </p>
                <input name="state"/>
                <p> Country </p>
                <input name="country"/>
                <p> Photo </p>
                <input name="photo"/>
                <p> Rooms </p>
                <input name="rooms" />
                <br />
                <button type="submit">
                    Save
                </button>
            </AddPropertyForm>
        </AddPropertyViewContainer>
    )
}

export default AddPropertyView

const AddPropertyViewContainer = styled.div`
    color: black;
`

const AddPropertyForm = styled.form`

`

const AddressTextArea = styled.textarea`
    name: address
`