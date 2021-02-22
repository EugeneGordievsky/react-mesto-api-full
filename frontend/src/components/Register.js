import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!inputEmail || !inputPassword) {
      return
    }
    props.onRegister(inputEmail, inputPassword);
    setInputEmail("");
    setInputPassword("");
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form className="authorization__form" onSubmit={handleSubmit} >
      <input required className="authorization__input" id="email" name="email" type="email" placeholder="Email"
        value={inputEmail} onChange={(evt) => setInputEmail(evt.target.value)} />
        <input required className="authorization__input" id="password" name="password" type="password" placeholder="Пароль"
        value={inputPassword} onChange={(evt) => setInputPassword(evt.target.value)} />
        <button type="submit" className="authorization__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="./sign-in" className="authorization__signin-link">Уже зарегистрированы? Войти</Link>
    </div>
  )
}
