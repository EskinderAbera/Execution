import KPIList from "./components/KPIList";
import { APIContextProvider } from './contexts/KPIContext';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Protected from "./components/Protected";
import { useState } from "react";
import CheckConnection from "./components/CheckConnection";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (  
    <CheckConnection>
      <APIContextProvider>
        <Router>
          <Routes>
            <Route path="/" element = { <Navigate replace to="/login" />}></Route>
            <Route path="/login" element = {<LoginPage setIsLoggedIn = {setIsLoggedIn} />}></Route>
            <Route path="/landing" element = { <Protected isLoggedIn={isLoggedIn}><LandingPage /></Protected>}></Route>
            <Route path="/kpi" element = {<Protected isLoggedIn={isLoggedIn}><KPIList /></Protected>}></Route>
          </Routes>
        </Router>
      </APIContextProvider>   
    </CheckConnection>
    )
}

export default App;
