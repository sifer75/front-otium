import React, { useState } from "react";
import axios from "axios";
import "../components/AuthForm.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OneInput from "./OneInput";

const AuthForm = ({ mode }) => {
  const { authentificationUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userToSignup = {
        email,
        password,
        name,
        phoneNumber,
        birthDate,
        address,
        country,
      };
      const userToLogin = { email, password };
      if (mode === "signup") {
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          userToSignup
        );
        navigate("/auth/accountcreated");
      } else {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          userToLogin
        );
        localStorage.setItem("token", response.data.token);
        setError("");
        await authentificationUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {mode === "signup" && (
        <form onSubmit={handleSubmit}>
          <p className="h1Signup">login</p>
          <div className="login">
            <OneInput
              key={"email"}
              label={"email"}
              type={"text"}
              value={email}
              name={"email"}
              onChange={handleEmailChange}
            />
            <OneInput
              key={"password"}
              label={"password"}
              type={"text"}
              value={password}
              name={"password"}
              onChange={handlePasswordChange}
            />
          </div>
          <p>Identity</p>
          <div className="identity">
            <OneInput
              key={"name"}
              label={"name"}
              type={"text"}
              value={name}
              name={"name"}
              onChange={handleNameChange}
            />
            <OneInput
              key={"birthDate"}
              label={"birthDate"}
              type={"Date"}
              value={birthDate}
              name={"birthDate"}
              onChange={handleBirthDateChange}
            />
          </div>
          <p>contact details</p>
          <div className="identity">
            <OneInput
              key={"phoneNumber"}
              label={"phoneNumber"}
              type={"text"}
              value={phoneNumber}
              name={"phoneNumber"}
              onChange={handlePhoneNumberChange}
            />
            <OneInput
              key={"country"}
              label={"country"}
              type={"text"}
              value={country}
              name={"country"}
              onChange={handleCountryChange}
            />
            <OneInput
              key={"address"}
              label={"address"}
              type={"text"}
              value={address}
              name={"address"}
              onChange={handleAddressChange}
            />
          </div>
          <button>submit</button>
        </form>
      )}

      {mode === "login" && (
        <form onSubmit={handleSubmit}>
          <OneInput
            label={"Email: "}
            type={"text"}
            value={email}
            name={"email"}
            onChange={handleEmailChange}
          />
          <OneInput
            label={"Password: "}
            type={"text"}
            value={password}
            name={"password"}
            onChange={handlePasswordChange}
          />
          <button>{mode}</button>
        </form>
      )}
    </>
  );
};

export default AuthForm;
