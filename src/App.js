import KPIList from "./components/KPIList";
import { APIContextProvider } from './contexts/KPIContext';
import { BrowserRouter as Router,Routes, Route, Link, Navigate} from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (  
      <APIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element = { <Navigate replace to="/landing" />}></Route>
            {/* <Route path="/login" element = {<LoginPage />}></Route> */}
            <Route path="/landing" element = {<LandingPage />}></Route>
            <Route path="/kpi" element = {<KPIList />}></Route>
          </Routes>
        </Router>
        </APIContextProvider>    
  );
}

export default App;
