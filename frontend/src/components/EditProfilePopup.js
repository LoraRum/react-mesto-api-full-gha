import PopupWithForm from "./PopupWithForm";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser, isOpen]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleEditName(e) {
        setName(e.target.value);
    }

    function handleEditDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit() {
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"popup-user-profile"}
            buttonText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="input input_type_name"
                id="username"
                maxLength="40"
                minLength="2"
                name="username"
                placeholder="Имя"
                required
                type="text"
                value={name || ""}
                onChange={handleEditName}
            />
            <span className="username-error popup__input-error"></span>

            <input
                className="input input_type_about"
                id="about"
                maxLength="200"
                minLength="2"
                name="about"
                placeholder="О себе"
                required
                type="text"
                value={description || ""}
                onChange={handleEditDescription}
            />
            <span className="about-error popup__input-error"></span>
        </PopupWithForm>
    );
}
export default EditProfilePopup;
