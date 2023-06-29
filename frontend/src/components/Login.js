import React, { useEffect, useState } from "react";
import Auth from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login({ isAuthorized }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }
    }, [isAuthorized]);

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "username") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        Auth.authorize(email, password)
            .then((response) => {
                localStorage.setItem("token", response.token);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setShowErrorPopup(true);
            });
    }

    function handleCloseErrorPopup() {
        setShowErrorPopup(false);
    }

    return (
        <div className="entrance">
            <p className="entrance__welcome">Вход</p>
            <form onSubmit={handleSubmit} className="entrance__form">
                <label htmlFor="username" className="entrance__form-label">
                    Логин:
                </label>
                <input
                    className="entrance__form-input"
                    required
                    id="username"
                    name="username"
                    type="text"
                    value={email}
                    onChange={handleChange}
                />
                <label htmlFor="password" className="entrance__form-label">
                    Пароль:
                </label>
                <input
                    className="entrance__form-input"
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit" className="entrance__button">
                    Войти
                </button>
            </form>
            <InfoTooltip
                isOpen={showErrorPopup}
                onClose={handleCloseErrorPopup}
                name="error-popup"
                type={"error"}
                message={"Что-то пошло не так! Попробуйте ещё раз."}
            />
        </div>
    );
}

export default Login;
