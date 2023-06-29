import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import React from "react";

function Header({ isAuthorized, onLogout }) {
    const email = localStorage.getItem("email");

    return (
        <header className="header">
            <img alt="Логотип место" className="header__logo" src={logo} />
            <div className="header__links">
                {isAuthorized ? (
                    <div className="header__email">{email}</div>
                ) : null}

                <Routes>
                    {!isAuthorized && (
                        <>
                            <Route
                                path="/sign-in"
                                element={
                                    <Link
                                        to="/sign-up"
                                        className="header__login-button"
                                    >
                                        Регистрация
                                    </Link>
                                }
                            />
                            <Route
                                path="/sign-up"
                                element={
                                    <Link
                                        to="/sign-in"
                                        className="header__login-button"
                                    >
                                        Войти
                                    </Link>
                                }
                            />
                        </>
                    )}
                    {isAuthorized && (
                        <Route
                            path="/"
                            element={
                                <button
                                    onClick={onLogout}
                                    className="header__login-button"
                                >
                                    Выйти
                                </button>
                            }
                        />
                    )}
                </Routes>
            </div>
        </header>
    );
}

export default Header;
