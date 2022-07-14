import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [actual, setActual] = useState(0);
  const [month, setMonth] = useState("m")
  const [numberofMonthsLeft, setNumberofMonthsLeft] = useState(0);
  const [base, setBase] = useState("")

  const changeBase = (dept) => {
    setBase(dept)
  }

  const changeKPIs = (KPIs) => {
    const newkpis = KPIs.map((kpi, index) => { 
      if(kpi.kpi_unit_measurement === 'Percentage') {
        kpi.kpi_weight = (kpi.kpi_weight * 100)
        kpi.kpi_target = (kpi.kpi_target * 100)
      } else {
        kpi.kpi_weight = (kpi.kpi_weight * 100)
      }
    })
    setKpis(KPIs)
  }

  // useEffect(() => {
    
  //   async function fetchData() {
  //     const { data } = await axios.get(
  //       `https://bsc-newapi.herokuapp.com/bsc/kpi/`
  //       `http://localhost:8000/bsc/kpi/`
  //     );
  //     setKpis(data);
  //     setLoading(false);
  //   }
  //   fetchData();
  // }, []);

  const changeNumberofMonthsLeft = (number) => {
    setNumberofMonthsLeft(number);
  }
  const changeActual = (actual) => {
    setActual(actual);
  }
  const changeMonth = (month) => {
    setMonth(month);
  }
  const updateKpi = (kpi_id, updatedKpi) => {
        setKpis(kpis.map((kpi) => kpi.kpi_id === kpi_id ? updatedKpi : kpi))
  }

  const deleteKpi = (kpi_id) => {
    setKpis(kpis.filter(kpi => kpi.kpi_id !== kpi_id))
  }

  return (
    <APIContext.Provider
      value={{
        kpis,
        month,
        actual,
        numberofMonthsLeft,
        updateKpi,
        deleteKpi,
        setKpis,
        setLoading,
        changeActual,
        changeMonth,
        changeNumberofMonthsLeft,
        changeKPIs,
        changeBase,
        base,
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


