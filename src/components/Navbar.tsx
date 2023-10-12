import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import fullLogo from '../assets/casamico-2.png'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <NavbarContainer>
            <SideContainer onClick={() => navigate("/")}>
                <LogoWrapper>
                    <LogoImage src={fullLogo} alt="Casamico logo" />
                </LogoWrapper>
            </SideContainer>
            <CenterContainer>
            </CenterContainer>
            <SideContainer>

            </SideContainer>

        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    border-radius: 10px;
    padding: 10px;
    display: flex;
    color: black;
`

const SideContainer = styled.div`
    width: 15%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const CenterContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoWrapper = styled.div`
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
`

const LogoImage = styled.img`
    height: 30px;
    object-fit: contain;
    padding-left: 25px;
`