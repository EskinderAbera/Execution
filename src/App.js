import KPIList from "./components/KPIList";
import { APIContextProvider } from './contexts/KPIContext';

function App() {
  return (
    <div className="container-xl">
    <div className="table-responsive">
      <div className="table-wrapper">  
      <APIContextProvider>
         <KPIList />
        </APIContextProvider>    
      </div>
    </div>
  </div>
  );
}

export default App;
