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
      credentials: 'include',
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  setUserInfo(item) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      credentials: 'include',
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
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: item.link
      })
    })
    .then((res) => this._checkResponse(res))
  };

  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      credentials: 'include',
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  addNewCard(info) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      credentials: 'include',
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
      credentials: 'include',
      headers: this._options.headers
    })
    .then((res) => this._checkResponse(res))
  };

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(this._options.baseUrl + "/cards/likes/" + id, {
        method: "PUT",
        credentials: 'include',
        headers: this._options.headers
      })
      .then((res) => this._checkResponse(res))
    } else {
      return fetch(this._options.baseUrl + "/cards/likes/" + id, {
        method: "DELETE",
        credentials: 'include',
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
    'Content-Type': 'application/json'
  }
});
