class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Произошла ошибка: ${result.status}:${result.statusText}`)
  }

  getUserInfo() {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "GET",
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  setUserInfo(item) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then((res) => this._checkResponse(res))
  };

  setAvatar(item) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: item.link
      })
    })
    .then((res) => this._checkResponse(res))
  };

  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  addNewCard(info) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: info.name,
        link: info.link
      })
    })
    .then((res) => this._checkResponse(res))
  };

  deleteCard(id) {
    return fetch(this._options.baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(this._options.baseUrl + "/cards/" + id + "/likes/", {
        method: "PUT",
        headers: this._options.headers
      })
      .then((res) => this._checkResponse(res))
    } else {
      return fetch(this._options.baseUrl + "/cards/" + id + "/likes/", {
        method: "DELETE",
        headers: this._options.headers
      })
      .then((res) => this._checkResponse(res))
    }
  }

  isLoading(button, isLoad) {
    if(isLoad) {
      this._buttonText = button.textContent;
      button.textContent = "Сохранение...";
    } else {
      button.textContent = this._buttonText;
    }
  }
}

export const api = new Api({
  baseUrl: "http://api.eugene.gordievsky.students.nomoreparties.space",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
});
