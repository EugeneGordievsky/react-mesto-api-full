import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
  const history = useHistory();

  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!inputEmail || !inputPassword) {
      return
    }
    props.onLogin(inputEmail, inputPassword);
    setInputEmail("");
    setInputPassword("");
    history.push("./")
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Вход</h1>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input required className="authorization__input" id="email" name="email" type="email" placeholder="Email"
        value={inputEmail} onChange={(evt) => setInputEmail(evt.target.value)} />
        <input required className="authorization__input" id="password" name="password" type="password" placeholder="Пароль"
        value={inputPassword} onChange={(evt) => setInputPassword(evt.target.value)} />
        <button type="submit" className="authorization__submit-button">Войти</button>
      </form>
    </div>
  )
}
