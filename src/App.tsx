import { Container } from '@mui/material';
import './App.css';
import { HandleBar } from './components/HandleBar';
import { Agent } from './pages/Agent';
import { AppProvider } from './AppContext';




function App() {
  return (
    <Container fixed>
      <AppProvider>
        <header className="App-header">
          <HandleBar />
        </header>
        <div className="App">
          <Agent />
        </div>
      </AppProvider>
    </Container>
  );
}

export default App;
