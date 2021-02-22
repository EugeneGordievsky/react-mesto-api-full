import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import InfoTolltip from "./InfoTooltip";
import Card from "./Card";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, openEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, openAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, openEditAvatar] = React.useState(false);
  const [infoTooltip, openInfoTooltip] = React.useState(false)
  const [cards, setCardsArray] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegister, setRegister] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");
  const [currentUser, setUserInfo] = React.useState({
    name: "",
    about: ""
  });
  const [selectedCard, handleCardClick] = React.useState({
    openCard: {},
    isOpen: false
  });

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("./sign-in");
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((res) => {
      // if(res.token) {
      //   localStorage.setItem("jwt", res.token);
      // }
      setHeaderEmail(email);
      setLoggedIn(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const onRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
      setRegister(true);
      openInfoTooltip(true);

    })
    .catch((err) => {
      setRegister(false);
      openInfoTooltip(true);
      console.log(err)
    })
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(owner => owner._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCardsArray(newCards);
    })
    .catch((err) => console.log(err))
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => setCardsArray(cards.filter((c) => {
      return c._id !== card._id;
    })))
    .catch((err) => console.log(err))
  };

  const handleUpdateUser = (item) => {
    api.setUserInfo(item)
    .then((userInfo) => {
      setUserInfo(userInfo);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (item) => {
    api.setAvatar(item)
    .then((userInfo) => {
      setUserInfo(userInfo);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (item) => {
    api.addNewCard(item)
    .then((newCard) => {
      setCardsArray([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    openEditProfile(false);
    openAddPlace(false);
    openEditAvatar(false);
    openInfoTooltip(false);
    handleCardClick({
      openCard: {},
      isOpen: false
    });
  };

  React.useEffect(() => {
    // const token = localStorage.getItem("jwt");

    // if (token) {
      auth.checkToken()
      .then((res) => {
        setLoggedIn(true);
        setHeaderEmail(res.data.email);
        history.push("./");
      })
      .catch((err) => {
        console.log(err);
      })
    // }
  }, [])

  React.useEffect(() => {
    if (loggedIn === true) {
      api.getInitialCards()
      .then((cards) => setCardsArray(cards))
      .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn === true) {
      api.getUserInfo()
      .then((userInfo) => {
        setUserInfo(userInfo)
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  return (
  <CurrentUserContext.Provider value={currentUser}>
  <div className="page">
    { loggedIn && <Header loggedIn={loggedIn} headerEmail={headerEmail} onSignOut={onSignOut} /> }
    <Switch>
      <Route exact path="/sign-in">
        { !loggedIn && <Header loggedIn={loggedIn} link="./sign-up" linkText="Регистрация" /> }
        <Login onLogin={onLogin} />
      </Route>
      <Route exact path="/sign-up">
        { !loggedIn && <Header loggedIn={loggedIn} link="./sign-in" linkText="Вход" /> }
        <Register onRegister={onRegister} />
      </Route>
      <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} onEditProfile = {openEditProfile}
      onAddPlace = {openAddPlace} onEditAvatar = {openEditAvatar} cardList = {cards.map((card) => <Card card = {card}
      onCardClick = {handleCardClick} key = {card._id} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />)} />
    </Switch>
    <Footer />
  </div>
  <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
  <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
  <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
  <ImagePopup card = {selectedCard} onClose = {closeAllPopups} />
  <InfoTolltip isOpen={infoTooltip} onClose = {closeAllPopups} isRegister={isRegister} />
  </CurrentUserContext.Provider>
  );
}

export default App;
