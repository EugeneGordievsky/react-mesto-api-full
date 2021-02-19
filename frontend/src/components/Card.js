import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(owner => owner._id === currentUser._id);

  return (
    <li className="element">
      <button type="button" className={`element__delete-button ${!isOwn && `element__delete-button_invisible`}`}
      onClick={() => props.onCardDelete(props.card)}></button>
      <img className="element__image" src = {props.card.link} alt = {props.card.name} onClick = {() => {
        props.onCardClick({
        openCard: props.card,
        isOpen: true
        })
      }} />
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button className={`element__like-button ${isLiked && `element__like-button_active`}`} type="button"
          onClick={() => props.onCardLike(props.card)}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
