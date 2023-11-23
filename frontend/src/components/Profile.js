import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const roleTitle =
        currentUser.roles && currentUser.roles.includes("ROLE_USER")
            ? "użytkownika"
            : currentUser.roles && currentUser.roles.includes("ROLE_ADMIN")
                ? "administratora"
                : currentUser.roles && currentUser.roles.includes("ROLE_MODERATOR")
                    ? "moderatora"
                    : "";

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
                            <h3 className="mb-4">
                                Profil {roleTitle}
                            </h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-2">
                                        <strong>Adres e-mail:</strong>
                                        <br></br>
                                        {currentUser.email}
                                    </p>
                                    <strong>Nadane role:</strong>
                                    <ul className="list-unstyled">
                                        {currentUser.roles &&
                                            currentUser.roles.map((role, index) => (
                                                <li key={index}>{role}</li>
                                            ))}
                                    </ul>
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
