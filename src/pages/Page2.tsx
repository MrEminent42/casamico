import React from 'react'
import styled from 'styled-components';

const Page2 = () => {
    return (
        <TaskContainer>
            <BackButtonContainer>
                {/* <BackButtonButton>

                </BackButtonButton> */}
            </BackButtonContainer>
        </TaskContainer>
    )
}

export default Page2

const TaskContainer = styled.div`
    border: 2px solid blue;
    display: flex;
    flex-direction: column;
`

const BackButtonContainer = styled.div`
    border: 2px solid red;
    display: flex;
`