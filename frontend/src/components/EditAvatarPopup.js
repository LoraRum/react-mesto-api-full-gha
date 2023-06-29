import PopupWithForm from "./PopupWithForm";
import React, { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit() {
        onUpdateAvatar({
            avatar: `${avatarRef.current.value}`,
        });
    }

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"popup-change-avatar"}
            buttonText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="input input_type_link"
                id="avatar"
                placeholder="Введите ссылку на аватар"
                required
                type="url"
                ref={avatarRef}
            />
            <span className="avatar-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
