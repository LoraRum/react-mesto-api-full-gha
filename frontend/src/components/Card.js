import React, {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDisLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = `group__like ${isLiked ? 'group__like_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card._id);
    }

    function handleLikeClick() {
        if (isLiked) {
            onCardDisLike(card);
        } else  {
            onCardLike(card);
        }
    }

    return (
        <div className="group card">
            <img
                alt={card.name}
                className="group__image"
                src={card.link}
                onClick={handleClick}
            />
            <div className="group__box">
                <h2 className="group__text">{card.name}</h2>
                <div className="group__likes">
                    <button
                        aria-label="кнопка лайк"
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    ></button>
                    <span className="group__like-sum">{card.likes.length}</span>
                </div>
                {isOwn && (
                    <button
                        className="group__remove" onClick={handleDeleteClick}
                    ></button>
                )}
            </div>
        </div>
    );
}

export default Card;