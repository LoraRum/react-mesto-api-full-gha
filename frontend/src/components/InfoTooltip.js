import React from "react";
import Success from "../images/Union.png";
import Error from "../images/Union1.png";

function InfoTooltip({ name, isOpen, onClose, type, message }) {
    function handleOverlayClick(e) {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    return (
        <div
            className={`popup ${isOpen ? "popup_opened" : ""}`}
            onClick={handleOverlayClick}
        >
            <div
                className="popup__container"
                id={name}
                onClick={handleOverlayClick}
            >
                <button
                    aria-label="закрыть попап"
                    className="popup__close"
                    type="button"
                    onClick={onClose}
                ></button>
                <div className="popup__content">
                    <img
                        className="popup__image"
                        src={type === "error" ? Error : Success}
                        alt="Результат регистрации"
                    />
                    <p className="popup__text">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
