import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/KPIContext";
import './LandingPage.css';
import hailes from '../resources/images/hailes_cleanup.jpg'
import loader from '../resources/images/loader.gif'
import coop from '../resources/images/coop.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, url } from "./Constants";
import { bounce, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components'
import handleDarkMood from "./dakMood";

const Bounce = styled.div`animation: 2s ${keyframes `${bounce}`} infinite`;
const FadeIn = styled.div`animation: 2s ${keyframes `${fadeIn}`} infinite`;

const LandingPage = () => {

  let navigate = useNavigate();
  const { changeKPIs, changeBase, changeDepartment, department, depts, roles, subdepts, base} = useAPI();
  const [loading, setLoading] = useState(false)
  const [deptId, setDeptId] = useState('')

  const [isSubDept, setIsSubDept] = useState(false)
  const [Departmente, setDepartmente] = useState('')

  const handleDepartment = (e) => {
    const s = e.target.value
    changeDepartment(e.target.value)

    if (s === 'admin'){
      setLoading(true)
      axios
      .get(`http://localhost:8000/bsc/ceo/kpi/${s}/`)
      .then((response) => {
        if (response.status == 200) {
          changeKPIs(response.data)
          navigate(`/kpi`);
          setLoading(false)
        }
      })
      .catch((error) => {
          alert(error.response.data['Error']);
          setLoading(false)
      });

    } 
  }

  const handleChange = (e) => {
    changeBase(e.target.value)

    if (department === 'Vice President'){
      const bases = e.target.value
      setLoading(true)
      axios
      .get(`http://localhost:8000/bsc/vp/kpi/${bases}/`)
      .then((response) => {
        if (response.status == 200) {
          changeKPIs(response.data)
          navigate(`/kpi`);
          setLoading(false)
        }
      })
      .catch((error) => {
          alert(error.response.data['Error']);
          setLoading(false)
      });
    } else if (department === 'director'){
      setIsSubDept(true)
      {depts.filter(item => item.dept_name === e.target.value).map(dept => {
        setDeptId(dept.dept_id)
      })}
      setDepartmente(e.target.value)
    }
  }

  const handleSubDeptChange = (e) => {
    const bases = e.target.value
    changeBase(e.target.value)
    setLoading(true)
    axios
      .get(`http://localhost:8000/bsc/dir/kpi/${Departmente}/${bases}/`)
      .then((response) => {
        if (response.status == 200) {
          changeKPIs(response.data)
          navigate(`/kpi`);
          setLoading(false)
        }
      })
      .catch((error) => {
          alert(error.response.data['Error']);
          setLoading(false)
      });
  }

  // useEffect(() => {
  //   console.log(deptId)
  // }, [deptId])

  const SubDeptDropDown = () => {
    return (
      <div className="form-group">
        <select id='KPI' className="form-control selecting" onChange={(e) => handleSubDeptChange(e)}>
          <option>Select....</option>
          {
            ( subdepts && subdepts.length > 0 ) ? 
            subdepts.filter((item, index) => item.department === deptId).
            map((subdept, index) => (
              <option key = {subdept.id} value={subdept.name}>
                {subdept.name}
              </option>
            )) : null
          }
        </select>
      </div>
    )
  }

  return (
    <main>
      {loading ? <div className="loader-landing"> <img className="img-loader big-wrapper" src={loader}/></div>:
        <div className="big-wrapper light">
        <>
          <header>
            <div className="container">
              <div className="logo">
                <Bounce><img src={coop} alt="Logo" /></Bounce>
              </div>
            </div>
          </header>
          
          <div className="showcase-area">
            <div className="container">
              <div className="left">
                <div className="big-title">
                  <Bounce><h1>Planning DashBoard</h1></Bounce>
                  <h1>Start Exploring now.</h1>
                </div>
                <FadeIn><p className="text">
                "To be the leading private bank in 2025"
                </p>
                </FadeIn>
                <div className="cta">
                  <div className="form-group">
                    <select id='KPI' className="form-control selecting" onChange={(e)=>handleDepartment(e)}>
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
                </div>
                <div className="cta">
                   {
                    (department === 'Vice President' || department === 'director') ? 
                    <div className="form-group">
                    <select id='KPI' className="form-control selecting" onChange={(e) => handleChange(e)}>
                      <option>Select....</option>
                      {
                        ( depts && depts.length > 0 ) ? 
                        depts.
                        map((dept, index) => (
                          <option key = {dept.dept_id} value={dept.dept_name}>
                            {dept.dept_name}
                          </option>
                        )) : null
                      }
                    </select>
                  </div>
                  : null
                    
                  }
                  { isSubDept ? <SubDeptDropDown /> : null}
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