import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AppProvider } from '@shopify/polaris';
import Container from 'react-bootstrap/Container';
import './App.css';
import Forms from './pages/Forms';
import Home from './pages/Home';
import Products from "./pages/Products";
function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Container>
            <Routes>
              <Route exact path="/" element={<Forms />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </Container>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
