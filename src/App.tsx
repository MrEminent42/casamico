import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';
import Tasks from './pages/Tasks';
import { ThemeProvider, createTheme } from '@mui/material';


function App() {

  return (
    <FontWrapper>
      <ThemeProvider theme={theme}>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property/:id/*" element={<Tasks />} />
          </Routes>
        </MainContainer>
      </ThemeProvider>
    </FontWrapper>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: '#d0e4cc',
      contrastText: '#5F5F5F'
    },
    secondary: {
      main: '#E0CCE4',
      contrastText: '#5F5F5F'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '40px',
        }
      },
    }
  }
})

const FontWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const MainContainer = styled.div`
  color: black;
`