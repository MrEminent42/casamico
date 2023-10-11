import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

function App() {
  // store the currently selected property in what's called a "state"
  // that way, React knows to update things on the page when this variable changes
  // importantly, you can only update the variable with the function that's 2nd in the brackets
  // in this case, that's `setSelectedProperty`
  const [selectedProperty, setSelectedProperty] = useState('');

  return (
    <FontWrapper>
      {/* Provide the selectedProperty state (aka variable) 
      and the setSelectedProperty function to the Navbar so it can see
      and update the value as needed.  */}
      <Navbar selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty} />
      <MainContainer>
        <Routes>
          {/* Again, pass the state and the function to update it. */}
          <Route path="/" element={<Home setSelectedProperty={setSelectedProperty} />} />
          <Route path="/1" element={<Page1 setSelectedProperty={setSelectedProperty} />} />
          <Route path="/2" element={<Page2 />} />
        </Routes>
      </MainContainer>
    </FontWrapper>
  );
}

export default App;

const FontWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`
const MainContainer = styled.div`
  color: black;
`