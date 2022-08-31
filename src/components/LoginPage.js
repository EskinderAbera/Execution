import React from "react"
import { useState } from "react";
import './Login.css'
import axios from "axios";
import { url } from "./Constants";
import { useNavigate } from "react-router-dom";
import loader from '../resources/images/loader.gif'
import { useAPI } from "../contexts/KPIContext";

export default function LoginPage ({setIsLoggedIn}) {

  let navigate = useNavigate();
  const { changeUsers } = useAPI();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInValid, setIsInValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const getUsers = await axios.get(
      `https://pms-apis.herokuapp.com/core/users/`
      )
    changeUsers(getUsers.data)
}

  const submitForm = async (e) => {  
    e.preventDefault();
    if (username.length < 4 && password.length < 4){
      setIsInValid(true)
    } else {
      setLoading(true)
      var datas = {
        "username" : username,
        "password" : password
      }
      axios
      .post(`${url}/core/other/login/`, datas)
      .then((response) => {
          if (response.status === 200) {
            fetchData();
            navigate(`/landing`);
            setIsLoggedIn(true)
          }
      })
      .catch((error) => {
        setLoading(false)
        alert(error.response.data["Error"])
        });
    }
  }
          
  return (
    <div className="Auth-form-container">
      { loading ? <div className="loader-landing"> <img className="img-loader big-wrapper" alt="pic" src={loader}/></div>: 
        <form className="Auth-form" onSubmit={submitForm}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            {isInValid ? <div><span style={{color: 'orange'}}><ul><li>Username must be greater than 4</li><li>Password must be greater than 4</li></ul></span></div> : null}
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
              Forgot Password?
            </p> */}
          </div>
        </form>
      }
    </div>
  )
}