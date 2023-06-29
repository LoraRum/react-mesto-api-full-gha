import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";

function ProtectedRoute({ children, isAuthorized }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    /* useEffect(() => {
        Auth.checkToken(token)
            .then(({ data }) => {
                const { email } = data;

                localStorage.setItem("email", email);
            })
            .catch(() => {
                navigate("/sign-in");
            });
    }, [token]);*/

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/sign-in");
        }
    }, [isAuthorized]);

    return children;
}

export default ProtectedRoute;
