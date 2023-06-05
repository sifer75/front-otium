import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../Pages/LoginPage.css"
import axios from "axios";
import { AuthContextWrapper } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";


const collectionLogin = "http://localhost:3000/login";

function LoginPage() {
  async function handleSubmitLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(collectionLogin, {
        email,
        password,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="bodyLogin">
        <div className="description">
          <h1>First time here?</h1>
          <p>
            As an esteemed member of Otium, gain access to our exclusive
            collection of villas by submitting a membership application.
            Experience unrivaled luxury and reserve your dream accommodations.
            Unlock a world of opulence and tranquility. Join the privileged few
            at Otium. Apply now.
          </p>
        </div>
        <div className="connection">
          <p>Already a member?</p>
          <AuthForm mode={"login"} />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
