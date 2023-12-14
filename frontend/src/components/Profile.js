import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const currentUser = AuthService.getCurrentUser();
    const roleTitle =
        currentUser.roles && currentUser.roles.includes("ROLE_USER")
            ? "użytkownika"
            : currentUser.roles && currentUser.roles.includes("ROLE_ADMIN")
                ? "administratora"
                : currentUser.roles && currentUser.roles.includes("ROLE_MODERATOR")
                    ? "moderatora"
                    : "";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;

                if (userId) {
                    const response = await axios.get(`http://localhost:8082/api/users/${userId}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);



    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile-img"
                                className="profile-img-card"
                            />
                        </div>
                        <div className="col-md-9">
                            <h3 className="mb-4">Profil {roleTitle}</h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    {userData && (
                                        <>
                                            <p className="mb-2">
                                                <strong>Adres e-mail:</strong>
                                                <br />
                                                {userData.email}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Imię:</strong>
                                                <br />
                                                {userData.firstName}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Nazwisko:</strong>
                                                <br />
                                                {userData.lastName}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Nazwa użytkownika:</strong>
                                                <br></br>
                                                {userData.username}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Adres:</strong>
                                                <br></br>
                                                {userData.address}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Miasto:</strong>
                                                <br></br>
                                                {userData.city}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Kod pocztowy:</strong>
                                                <br></br>
                                                {userData.postalCode}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Doświadczenie:</strong>
                                                <br></br>
                                                {userData.experience}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Numer telefonu:</strong>
                                                <br></br>
                                                {userData.phoneNumber}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Nadane role:</strong>
                                                <ul className="list-unstyled">
                                                    {currentUser.roles &&
                                                        currentUser.roles.map((role, index) => (
                                                            <li key={index}>{role}</li>
                                                        ))}
                                                </ul>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
