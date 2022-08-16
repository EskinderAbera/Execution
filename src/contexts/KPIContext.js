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
  const [department, setDepartment] = useState('')
  const [depts, setDepts] = useState([])
  const [roles, setRole] = useState([])
  const [subdepts, setSubDepts] = useState([])
  const [subSubDepts, setSubSubDepts] = useState([])
  const [users, setUsers] = useState([])

const fetchData = async () => {
  const getDepts = await axios.get(
    `https://pms-apis.herokuapp.com/core/department/`
    )
  const getRole = await axios.get(
    `https://pms-apis.herokuapp.com/core/role/`
  )
  const getSubDept = await axios.get(
    `https://pms-apis.herokuapp.com/core/subdepartment/`
  )
  const getSubSubDept = await axios.get(
    `https://pms-apis.herokuapp.com/core/subsub/`
  )
  setDepts(getDepts.data)
  setRole(getRole.data)
  setSubDepts(getSubDept.data)
  setSubSubDepts(getSubSubDept.data)
}

useEffect(() => {
    fetchData()
  }, []);

  const changeUsers = (users) => {
    setUsers(users)
  }

  const changeBase = (dept) => {
    setBase(dept)
  }

  const changeDepartment = (dept) => {
    setDepartment(dept)
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
        changeDepartment,
        department,
        roles,
        subdepts,
        depts,
        changeUsers,
        users,
        subSubDepts
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


