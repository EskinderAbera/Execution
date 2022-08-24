import React, { useState } from "react";
import { useAPI } from "../contexts/KPIContext";
import './LandingPage.css';
import hailes from '../resources/images/hailes_cleanup.jpg'
import loader from '../resources/images/loader.gif'
import coop from '../resources/images/coop.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bounce, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components'
import Select from "react-select";

// const Bounce = styled.div`animation: 2s ${keyframes `${bounce}`} infinite`;
const FadeIn = styled.div`animation: 2s ${keyframes `${fadeIn}`} infinite`;

const LandingPage = () => {

  let navigate = useNavigate();
  const { changeKPIs, depts, roles, subdepts, users, subSubDepts } = useAPI();
  const [loading, setLoading] = useState(false)
  const [process, setProcess] = useState(false)
  const [subProcess, setSubProcess] = useState(false)
  const [subSubProcess, setSubSubProcess] = useState(false)
  const [dept, setSubDept] = useState('')
  const [isDirector, setIsDirector] = useState(false)
  const [isGrade, setIsGrade] = useState(false)
  const [grades, setGrades] = useState('')
  const [isIndividual, setIsIndividual] = useState(false)

  const handleRoleChange = (e) => {
    setProcess(false)
    setSubProcess(false)
    setSubSubProcess(false)
    setIsDirector(false)
    setIsGrade(false)
    setGrades('')
    setIsIndividual(false)

    if (e.target.value === 'admin'){
      setLoading(true)
      let roleId = roles.filter(role => {if(role.role_name === e.target.value) {return role.role_id}})
      let userId = users.filter(user => {if (user.role === roleId[0].role_id) {return user.id}})
  
      axios
      .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
      .then(response => {
        if (response.status === 200){
          changeKPIs(response.data)
          setLoading(false)
          navigate('/kpi')
        }
      })
    } else if (e.target.value === 'Vice President'){
      setProcess(true)
    } else if(e.target.value === 'director'){
      setSubProcess(true)
    } else if(e.target.value === 'Manager'){
      setSubSubProcess(true)
    } else if(e.target.value === 'Individuals'){
      setIsIndividual(true)
    }else{
      return
    }
  }

  const getProcessKPI = (e) => {
    setLoading(true)
    let userId = users.filter(user => {if (user.department === e.target.value && user.subdepartment === null){return user.id}})
    
    axios 
    .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
    .then(response => {
      if (response.status === 200){
        changeKPIs(response.data)
        setLoading(false)
        navigate('/kpi')
      }
    })
  }

  const ProcessDropDown = () => {
    
    return (
      <select className="form-control selecting" onChange={(e) => getProcessKPI(e)}>
        <option>Select...</option>
        
        {
          depts && depts.length > 0 &&
          depts.map(dept => 
            <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
          )
        }
      </select>
    )
  }

  const getSubProcessKPI = (e) => {
    setLoading(true)
    let userId = users.filter(user => {if (user.subdepartment === parseInt(e.target.value) && user.sub_subdepartment === null){return user.id}})
    axios 
    .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
    .then(response => {
      if (response.status === 200){
        changeKPIs(response.data)
        setLoading(false)
        navigate('/kpi')
      }
    })
  }
  

  const SubProcessList = () => {
    return (
      <select className="form-control selecting" onChange={(e) => getSubProcessKPI(e)}>
        <option>Select...</option>
        {
          subdepts && subdepts.length > 0 &&
          subdepts.filter(item => item.department === dept)
          .map(subdept => 
            <option key={subdept.id} value={subdept.id}>{subdept.name}</option>)
        }
      </select>
    )
  }

  function handleSubProcess (e) {
    setIsDirector(true)
    setSubDept(e.target.value)
  }

  const SubProcessDropDown = () => {
    
    return (
      <select className="form-control selecting" value={dept} onChange={(e) => handleSubProcess(e)}>
        <option>Select...</option>
        
        {
          depts && depts.length > 0 &&
          depts.map(dept => 
            <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
          )
        }
      </select>
    )
  }

  const handleSubSubProcess = (e) => {
    setGrades(e.target.value)
    setIsGrade(true)
  }

  const SubSubProcessDropDown = () => {
    return (
      <select className="form-control selecting" value={grades} onChange={(e) => handleSubSubProcess(e)}>
        <option>Select...</option>
        
        {
          subSubDepts && subSubDepts.length > 0 &&
          subSubDepts.map(subSubDept => 
            <option key={subSubDept.id} value={subSubDept.id}>{subSubDept.name}</option>
          )
        }
      </select>
    )
  }

  const getGradesKPI = (val) => {
    setLoading(true)
    axios 
    .get(`https://pms-apis.herokuapp.com/bsc/kpi/${val}}/`)
    .then(response => {
      if (response.status === 200){
        changeKPIs(response.data)
        setLoading(false)
        navigate('/kpi')
      }
    })
  } 

  const GradeProcessList = () => {
    return (
      <Select
        options={users.filter(user => user.sub_subdepartment === parseInt(grades) && user.individuals === null).map(opt => ({label: opt.username, value: opt.id}))}
        onChange={opt => getGradesKPI(opt.value)}
      />
    )
  }

  const IndividualDropDown = () => {
    return (
      <Select
        options={users.filter(user => user.individuals !== null).map(opt => ({label: opt.username, value: opt.id}))}
        onChange = {opt => getGradesKPI(opt.value)}
      />
    )
  }

  return (
    <main>
      {loading ? <div className="loader-landing"> <img className="img-loader big-wrapper" src={loader} alt="pic"/></div>:
        <div className="big-wrapper light">
        <>
          <header>
            <div className="container">
              <div className="logo">
                <img src={coop} alt="Logo" />
              </div>
            </div>
          </header>
          
          <div className="showcase-area">
            <div className="container">
              <div className="left">
                <div className="big-title">
                    <h1>Execution DashBoard</h1>
                  <h1>Start Exploring now.</h1>
                </div>
                <FadeIn><p className="text">
                "To be the leading private bank in 2025"
                </p>
                </FadeIn>
                <div className="cta">
                  <div className="form-group">
                    <select id='KPI' className="form-control selecting" onChange={(e) => handleRoleChange(e)}>
                      <option>Select....</option>
                      {
                        ( roles && roles.length > 0 ) ? 
                        roles.
                        map((role, index) => (
                          <option key = {role.role_id} value={role.role_name}>
                            {role.role_name}
                          </option>
                        )) : null
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    {process && <ProcessDropDown /> }
                  </div>
                  <div className="form-group"> 
                    {subProcess && <SubProcessDropDown /> }
                  </div>
                  <div className="form-group">
                    {subSubProcess && <SubSubProcessDropDown />} 
                  </div>
                  <div className="form-group">
                    {isDirector && <SubProcessList />}
                  </div>
                  <div className="form-group grade" > 
                    {isGrade && <GradeProcessList />}
                  </div>
                  <div className="form-group grade">
                    {isIndividual && <IndividualDropDown />}
                  </div>  
                </div>
              </div>

              <div className="right">
                <img src={hailes} alt="Person Image" className="person" />
              </div>
            </div>
          </div>

          <div className="bottom-area">
            <div className="container">
              {/* <button className="tooglebtn" onClick={handleDarkMood}>dark</button> */}
              {/* <button className="toggle-btn" onClick={handleDarkMood}>
                <i className="far fa-moon"></i>
                <i className="far fa-sun"></i>
              </button> */}
            </div>
          </div>
          </>
        </div>
      }
    </main>
  )
}
export default LandingPage