function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_dark ${card ? 'popup_opened' : ''}`} id="popup-fullscreen">
            <div className="popup__container">
                <button
                    aria-label="закрыть попап"
                    className="popup__close"
                    type="button"
                    onClick={onClose}
                ></button>
                <div className="popup__content">
                    <figure className="fullscreen-image">
                        <img
                            alt={card?.name}
                            className="fullscreen-image__image"
                            src={card?.link}
                        />
                        <figcaption className="fullscreen-image__text">{card?.name}</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}


export default ImagePopup;