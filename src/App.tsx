import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Tasks from './pages/Tasks';

function App() {

  return (
    <FontWrapper>
      <Navbar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<Page1 />} />
          <Route path="/property/:id/*" element={<Tasks />} />
        </Routes>
      </MainContainer>
    </FontWrapper>
  );
}

export default App;

const FontWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const MainContainer = styled.div`
  color: black;
`