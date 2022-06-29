import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    async function fetchData() {
      const { data } = await axios.get(
        `https://bsc-newapi.herokuapp.com/bsc/kpi/`
      );
      setKpis(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const updateKpi = (kpi_id, updatedKpi) => {
        setKpis(kpis.map((kpi) => kpi.kpi_id === kpi_id ? updatedKpi : kpi))
  }

  const deleteKpi = (kpi_id) => {
    setKpis(kpis.filter(kpi => kpi.kpi_id !== kpi_id))
  }

  return (
    loading ? <h2>Loading.....</h2> :
    <APIContext.Provider
      value={{
        kpis,
        updateKpi,
        deleteKpi
      }}
    >
      {children}
    </APIContext.Provider>

  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}


