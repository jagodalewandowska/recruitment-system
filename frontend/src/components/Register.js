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

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerUser.password !== registerUser.passwordConfirm) {
        console.error("Hasło i powtórzenie hasła nie są takie same.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setErrorMessage("Hasło i powtórzenie hasła nie są takie same.");
        return;
      }

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
              <div className="alert alert-success" role="alert" style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' }}>
                {errorMessage}
              </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nazwa użytkownika</label>
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
                  required
              />
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
