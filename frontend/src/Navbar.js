import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ currentUser, logOut, showModeratorBoard, showAdminBoard }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link to={"/"} className="navbar-brand">
                Rekrutacja pracowników
            </Link>
            <div className="navbar-nav mr-auto">
                {showModeratorBoard && (
                    <li className="nav-item">
                        <Link to={"/mod"} className="nav-link">
                            Panel moderatora
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                            Panel administratora
                        </Link>
                    </li>
                )}

                {currentUser && (
                    <li className="nav-item">
                        <Link to={"/offers"} className="nav-link">
                            Oferty pracy
                        </Link>
                    </li>
                )}
            </div>

            <div className="navbar-nav ml-auto">
                {currentUser ? (
                    <div
                        className="dropdown"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="dropdown-toggle" onMouseEnter={toggleDropdown}>
                            <div className="profile-info">
                                <img
                                    src={currentUser.profileImage || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                                    alt="profile-img"
                                    className="profile-info-img"
                                />
                                <span>{currentUser.username}</span>
                            </div>
                        </button>
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                                </Link>
                                <Link to={"/fileservice"} className="nav-link">
                                    Moje pliki
                                </Link>
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    Wyloguj się
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Zaloguj się
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Zarejestruj się
                            </Link>
                        </li>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
