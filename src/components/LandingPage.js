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
    const { changeKPIs, changeBase} = useAPI();
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e) => {
        const bases = e.target.value
        changeBase(e.target.value)
        setLoading(true)
        axios
        .get(`${url}/${bases}/kpi/`)
        .then((response) => {
            if (response.status == 200) {
                changeKPIs(response.data)
                navigate(`/kpi`);
                setLoading(false)
            }
        })
        .catch((error) => {
            alert(error.response.data['Error']);
          });
    }
    return (
  <main>
    {loading ? <div className="loader-landing"> <img className="img-loader big-wrapper" src={loader}/></div>:
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
                <Bounce><h1>Planning DashBoard</h1></Bounce>
                <h1>Start Exploring now.</h1>
              </div>
              <FadeIn><p className="text">
              "To be the leading private bank in 2025"
              </p>
              </FadeIn>
              <div className="cta">
                <div className="form-group">
                  <select id='KPI' className="form-control selecting" onChange={(e)=>handleChange(e)}>
                    <option>Select....</option>
                    <option value="bsc">corporate</option>
                    <option value="operation">Banking Operation Process</option>
                    <option value="corporate">Corporate Banking Operation</option>
                    <option value="cooperative">Cooperative Banking Operation</option>
                    <option value="credit">Credit Appraisal Process</option>
                    <option value="finance">Finance and Facility Process</option>
                    <option value="hc">HC and Projects Management</option>
                    <option value="internal">Internal Audit Process</option>
                    <option value="ifb">IFB Process</option>
                    <option value="is">IS Process</option>
                    <option value="legal">Legal Services</option>
                    <option value="bod">BOD Secretary</option>
                    <option value="risk">Risk and Compliance</option>
                    <option value="strategy">Strategy and Marketing</option>
                    <option value="tech">Tech and Digital Process</option>
                  </select>
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
            <button className="toggle-btn" onClick={handleDarkMood}>
              <i className="far fa-moon"></i>
              <i className="far fa-sun"></i>
            </button>
          </div>
        </div>
        </>
      </div>
}
    </main>
    )
}
export default LandingPage