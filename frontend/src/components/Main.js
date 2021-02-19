import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar} />
        <button className="profile__avatar-button" type="button" onClick = {() => props.onEditAvatar(true)}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick = {() => props.onEditProfile(true)}></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="add-button" type="button" onClick = {() => props.onAddPlace(true)}></button>
      </section>
      <section className="cards">
        <ul className ="elements">
          {props.cardList}
        </ul>
      </section>
    </main>
  )
}
