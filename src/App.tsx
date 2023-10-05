import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

function App() {
  return (
    <FontWrapper>
      <Navbar />
      <MainContainer>
        Hello there! Welcome to Casamico.
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<Page1 />} />
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
  border-radius: 30px;
  padding: 100px 10px;
  color: black;
  text-align: center;
`