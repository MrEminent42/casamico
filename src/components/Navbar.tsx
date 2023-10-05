import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <NavbarContainer>
            <SideContainer>
                [logo]
            </SideContainer>
            <CenterContainer>
                <div>
                    This is the Navbar
                </div>
                <PageButtonsContainer>
                    <PageButton onClick={() => navigate("/1")}>
                        Page 1
                    </PageButton>
                    <PageButton onClick={() => navigate("/2")}>
                        Page 2
                    </PageButton>
                </PageButtonsContainer>
            </CenterContainer>
            <SideContainer>
                Profile button
            </SideContainer>

        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    background-color: #4e82ad;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    color: white;
`

const SideContainer = styled.div`
    border: 1px dashed red;
    width: 15%;
    text-align: center;
`

const CenterContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
`

const PageButtonsContainer = styled.div`
    display: flex;
    border: 1px dotted #09e748;
    gap: 100px;
`

const PageButton = styled.button`
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`