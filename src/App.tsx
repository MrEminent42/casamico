import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import { ThemeProvider, createTheme } from '@mui/material';


function App() {

  return (
    <FontWrapper>
      <ThemeProvider theme={theme}>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/property/:id/*" element={<Tasks />} />
          </Routes>
        </MainContainer>
      </ThemeProvider>
    </FontWrapper>
  );
}

export default App;

/**
 * Handles an error. Displays an alert to the user with the message "Eror while attempting to [whatWasAttempted]".
 * @param error the error object
 * @param whatWasAttempted a string like "create property"
 */
export const displayError = (error: any, whatWasAttempted: string) => {
  alert("Error while attempting to " + whatWasAttempted + "." + (error.message ? " " + error.message : ""))
  console.error(error)
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#d0e4cc',
      contrastText: '#5F5F5F'
    },
    secondary: {
      main: '#D9D9D9',
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
  },
  typography: {
    fontFamily: 'Montserrat',
  }
})

const FontWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const MainContainer = styled.div`
  color: black;
`