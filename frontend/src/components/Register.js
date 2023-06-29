import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function Register({ isAuthorized }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized]);

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        Auth.register(email, password)
            .then((response) => {
                console.log(response);
                setPopupType("success");
                setPopupMessage("Вы успешно зарегистрировались!");
            })
            .catch((err) => {
                console.log(err);
                setPopupType("error");
                setPopupMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
            .finally(() => {
                setIsPopupOpen(true);
            });
    }

    function handleClose() {
        setIsPopupOpen(false);
        navigate("/sign-in");
    }

    return (
        <div className="entrance">
            <p className="entrance__welcome">Регистрация</p>
            <form onSubmit={handleSubmit} className="entrance__form">
                <label htmlFor="email" className="entrance__form-label">
                    Email:
                </label>
                <input
                    className="entrance__form-input"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="entrance__form-label">
                    Пароль:
                </label>
                <input
                    className="entrance__form-input"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />

                <button type="submit" className="entrance__button">
                    Зарегистрироваться
                </button>
            </form>
            <div className="entrance__container">
                <p className="entrance__text">Уже зарегестрированны?</p>
                <Link className="entrance__link" to="/sign-in">
                    Войти
                </Link>
            </div>
            <InfoTooltip
                name="register"
                isOpen={isPopupOpen}
                onClose={handleClose}
                type={popupType}
                message={popupMessage}
            />
        </div>
    );
}

export default Register;
