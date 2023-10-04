import styled from 'styled-components';

function App() {
  return (
    <div>
      <WelcomeBox2>
        Hello there! Welcome to Casamico.
      </WelcomeBox2>
    </div>
  );
}

export default App;

const WelcomeBox2 = styled.div`
  background-color: #00bc74;
  border-radius: 30px;
  padding: 100px 10px;
  color: white;
  text-align: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`