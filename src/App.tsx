import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import Tasks from './pages/Tasks';


function App() {

  return (
    <FontWrapper>
      <Navbar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id/*" element={<Tasks />} />
          <Route path="/property/edit/:id/*" element={<AddProperty />} />
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