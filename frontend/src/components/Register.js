import React, { useState } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";

const Register = () => {

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    experience: "",
    phoneNumber: ""
  });


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!registerUser.username.trim()) {
      errors.username = "Nazwa użytkownika jest wymagana";
    } else if (registerUser.username.length < 4) {
      errors.username = "Login nie może być krótszy niż 4 znaki";
    } else if (registerUser.username.length > 20) {
      errors.username = "Login nie może być dłuszy niż 20 znaków";
    }

    if (!registerUser.email.trim()) {
      errors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(registerUser.email)) {
      errors.email = "Nieprawidłowy format emaila";
    }

    if (!registerUser.password.trim()) {
      errors.password = "Imię jest wymagane";
    } else if (registerUser.password.length > 64) {
      errors.password = "Hasło nie może być dłuższe niż 64 znaków";
    } else if (registerUser.password.length < 4) {
      errors.password = "Hasło nie może być krótsze niż 4 znaki";
    }

    if (registerUser.password !== registerUser.passwordConfirm) {
      errors.passwordConfirm = "Hasło i powtórzenie hasła nie są takie same";
    }

    if (!registerUser.firstName.trim()) {
      errors.firstName = "Imię jest wymagane";
    } else if (registerUser.firstName.length > 20) {
      errors.firstName = "Imię nie może być dłuższe niż 20 znaków";
    } else if (registerUser.firstName.length < 4) {
      errors.firstName = "Imię nie może być krótsze niż 4 znaki";
    }

    if (!registerUser.lastName.trim()) {
      errors.lastName = "Nazwisko jest wymagane";
    } else if (registerUser.lastName.length > 30) {
      errors.lastName = "Nazwisko nie może być dłuższe niż 30 znaków";
    } else if (registerUser.lastName.length < 2) {
      errors.lastName = "Nazwisko nie może być krótsze niż 2 znaki";
    }

    if (!registerUser.phoneNumber.trim()) {
      errors.phoneNumber = "Numer telefonu jest wymagany";
    } else if (!/^[0-9]{9}$/.test(registerUser.phoneNumber)) {
      errors.phoneNumber = "Nieprawidłowy format numeru telefonu";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Proszę poprawić błędy formularza.");
      return;
    }

    try {
      await axios.post("http://localhost:8082/api/users", registerUser, { headers: authHeader() });
      console.log(registerUser);
      setRegisterUser({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        experience: "",
        phoneNumber: "",
        roles: ""
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setErrorMessage("");
      setSuccessMessage("Zarejestrowano pomyślnie");
    } catch (error) {
      console.error(`Error adding user: ${error}`);
    }
  };


  return (
      <div className="col-md-12">
        <div className="card card-container">
          {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
          )}
          {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nazwa użytkownika</label>
              {errors.username && (
                  <div className="alert alert-danger">{errors.username}</div>
              )}
              <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={registerUser.username}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              {errors.email && (
                  <div className="alert alert-danger">{errors.email}</div>
              )}
              <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={registerUser.email}
                  onChange={handleRegisterInputChange}
                  required
              />

            </div>

            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              {errors.password && (
                  <div className="alert alert-danger">{errors.password}</div>
              )}
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={registerUser.password}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Powtórz hasło</label>
              {errors.passwordConfirm && (
                  <div className="alert alert-danger">{errors.passwordConfirm}</div>
              )}
              <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  value={registerUser.passwordConfirm}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Imię</label>
              {errors.firstName && (
                  <div className="alert alert-danger">{errors.firstName}</div>
              )}
              <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={registerUser.firstName}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nazwisko</label>
              {errors.lastName && (
                  <div className="alert alert-danger">{errors.lastName}</div>
              )}
              <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={registerUser.lastName}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Adres</label>
              <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={registerUser.address}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Miasto</label>
              <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={registerUser.city}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Kod pocztowy</label>
              <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={registerUser.postalCode}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Doświadczenie</label>
              <textarea
                  className="form-control"
                  name="experience"
                  value={registerUser.experience}
                  onChange={handleRegisterInputChange}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Numer telefonu</label>
              <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={registerUser.phoneNumber}
                  onChange={handleRegisterInputChange}
                  pattern="[0-9]{9}"
                  required
              />
              {errors.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber}</div>
              )}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-red btn-block">
                Zarejestruj się
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;
