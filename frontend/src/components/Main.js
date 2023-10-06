import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='content'>
      <section className='profile'>
        <div
          className='content__profile-avatar-overlay'
          onClick={props.handleEditAvatarClick}
        >
          <div
            className='content__profile-image'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          -
        </div>
        <div className='content__profile-title-grup'>
          <div className='content__profile-title-container'>
            <h1 className='content__profile-title'>{currentUser.name}</h1>
            <button
              className='content__profile-button-edit'
              onClick={props.handleEditProfileClick}
            ></button>
          </div>
          <p className='content__profile-description'>{currentUser.about}</p>
        </div>
        <button
          className='content__profile-button-add'
          onClick={props.handleAddPlaceClick}
        ></button>
      </section>
      <div id='gallery' className='content__elements-grid'>
        {props.cards.map((card) => (
          <Card
            card={card}
            handleCardClick={props.handleCardClick}
            handleCardLike={props.handleCardLike}
            handleCardDelete={props.handleCardDelete}
            key={card._id}
          />
        ))}
        ;
      </div>
    </main>
  );
}

export default Main;
