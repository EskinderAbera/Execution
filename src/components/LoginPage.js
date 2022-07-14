import React from "react"
import { useState } from "react";
import './Login.css'
import axios from "axios";
import { url } from "./Constants";
import { useNavigate } from "react-router-dom";

export default function LoginPage () {

    let navigate = useNavigate();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async (e) => {  
        e.preventDefault();
    
          var datas = {
            "username" : username,
            "password" : password
          }
          axios
          .post(`${url}/core/other/login/`, datas)
          .then((response) => {
              if (response.status == 200) {
                navigate(`/landing`);
                
              }
          })
          .catch((error) => {
            alert(error.response.data["Error"])
            });
        }
          
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitForm}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}