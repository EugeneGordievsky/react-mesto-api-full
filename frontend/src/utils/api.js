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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => this._checkResponse(res))
  };

  setUserInfo(item) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: item.link
      })
    })
    .then((res) => this._checkResponse(res))
  };

  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => this._checkResponse(res))
  };

  addNewCard(info) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => this._checkResponse(res))
  };

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(this._options.baseUrl + "/cards/" + id + "/likes/", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((res) => this._checkResponse(res))
    } else {
      return fetch(this._options.baseUrl + "/cards/" + id + "/likes/", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((res) => this._checkResponse(res))
    }
  }
}

export const api = new Api({
  baseUrl: "https://api.eugene.gordievsky.students.nomoreparties.space",
});
