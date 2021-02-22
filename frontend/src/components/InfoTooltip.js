import successRegister from "../images/success-register.svg";
import errorRegister from "../images/error-register.svg";

export default function InfoTolltip(props) {
  return (
    <section className={`popup ${props.isOpen && `popup_opened`}`}>
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_edit" type="button" onClick = {props.onClose}></button>
        <div className="popup__info-tooltip">
          <img src={props.isRegister ? successRegister : errorRegister} alt="Успешная регистрация" className="popup__info-tooltip_image"></img>
          <p className="popup__info-tooltip_text">{props.isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</p>
        </div>
      </div>
    </section>
  )
}
