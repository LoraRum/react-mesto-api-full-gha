function PopupWithForm({title, name, children, buttonText, isOpen, onClose, onSubmit}) {
    const popupClassName = `popup ${isOpen ? 'popup_opened' : ''}`;

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div className={popupClassName} id={name}>
            <div className="popup__container">
                <button aria-label="закрыть попап" className="popup__close" type="button" onClick={onClose}></button>
                <div className="popup__content">
                    <div className="card card_with-shadow form">
                        <h2 className="form__title">{title}</h2>
                        <form className="form__form" name={name} onSubmit={handleSubmit}>
                            <fieldset className="form__user-info">
                                {children}
                            </fieldset>
                            <button className="form__save" type="submit">{buttonText}</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;