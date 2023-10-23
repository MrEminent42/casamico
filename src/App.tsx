import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';


function App() {

  return (
    <FontWrapper>
      <Navbar />
      <MainContainer>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/properties" replace />}
          />
          <Route path="/properties/*" element={<Home />} />
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