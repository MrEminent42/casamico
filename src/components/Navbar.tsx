import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import fullLogo from '../assets/casamico-2.png'

// this is a shell of an object that should contain what's written below
interface NavbarProps {
    selectedProperty: string;
    // Below, Javascript shorthand for a function that takes a string and returns nothing
    setSelectedProperty: (property: string) => void;
}

// Typescript requires defining all properties
// We are saying that the "props" looks like the "NavbarProps" interface defined above
const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();
    const { selectedProperty, setSelectedProperty } = props;

    // goHome function should set the selected property to an empty string
    // and then navigate the user home
    // important to update the state so the navbar knows what to display
    const goHome = () => {
        setSelectedProperty("");
        navigate("/");
    }

    return (
        <NavbarContainer>
            <SideContainer onClick={goHome}>
                <LogoWrapper>
                    <LogoImage src={fullLogo} alt="Casamico logo" />
                </LogoWrapper>
            </SideContainer>
            <CenterContainer>
                {/* Tasks */}
            </CenterContainer>
            <SideContainer>
                <div style={{ fontWeight: 700 }}>
                    {/* In javascript, an empty string equals false.
                    This is a shorthand way of displaying the selectedProperty variable,
                    or, if that equals false (aka an empty string), display what's after the OR operator. */}
                    {selectedProperty || "Select a property"}
                </div>
                {/* In javascript, an empty string equals false. So, here, only 
                display the "change property" button if there is a property selected. */}
                {selectedProperty &&
                    <div style={{ color: 'grey', cursor: 'pointer' }} onClick={goHome}>
                        ✎ Change property
                    </div>}
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