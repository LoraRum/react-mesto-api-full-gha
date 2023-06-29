import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        if (isFormSubmitted) {
            setName("");
            setLink("");
            setIsFormSubmitted(false);
        }
    }, [isFormSubmitted]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit() {
        onAddPlace({ name, link });
        setIsFormSubmitted(true);
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="input input_type_name"
                id="place-name"
                maxLength="30"
                minLength="2"
                name="name"
                placeholder="Название"
                required
                type="text"
                value={name}
                onChange={handleNameChange}
            />
            <span className="place-name-error popup__input-error"></span>

            <input
                className="input input_type_link"
                id="link"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                value={link}
                onChange={handleLinkChange}
            />
            <span className="link-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
