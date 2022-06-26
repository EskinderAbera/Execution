import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://bsc-newapi.herokuapp.com/bsc/kpi/`
      );
      setKpis(data);
    }
    fetchData();
  }, []);

  const updateKpi = (kpi_id, updatedKpi) => {
        setKpis(kpis.map((kpi) => kpi.kpi_id === kpi_id ? updatedKpi : kpi))
    }

  return (
    <APIContext.Provider
      value={{
        kpis,
        updateKpi
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





// const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));





// const deleteEmployee = (id) => {
//     setEmployees(employees.filter(employee => employee.id !== id))
// }

// const updateEmployee = (id, updatedEmployee) => {
//     setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
// }

    // return (
//         <EmployeeContext.Provider value={{kpis}}>
//             {props.children}
//         </EmployeeContext.Provider>
//     )
// }

// export default EmployeeContextProvider;


