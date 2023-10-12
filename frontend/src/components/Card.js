import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `content__elements__delete-button ${
    isOwn ? 'content__elements__delete-button_active' : ''
  }`;
  const isLiked = props.card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = `content__elements__button-like ${
    isLiked ? 'content__elements__button-like-active' : ''
  }`;
  return (
    <div className='card__template'>
      <div className='elements'>
        <img
          className='content__elements-image'
          src={props.card.link}
          alt='imagenes-tarjetas'
          onClick={() => props.handleCardClick(props.card)}
        />
        <button
          className={cardDeleteButtonClassName}
          onClick={() => props.handleCardDelete(props.card)}
        ></button>
        <div className='conent__elements-title-container'>
          <h2 className='content__elements-title'>{props.card.name}</h2>
          <div className='content__elements-likes-container'>
            <button
              className={cardLikeButtonClassName}
              onClick={() => props.handleCardLike(props.card)}
            ></button>
            <span className='content__elements__numbers-like'>
              {props.card.likes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
