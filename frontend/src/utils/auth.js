class Auth {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Произошла ошибка: ${result.status}:${result.statusText}`)
  }

  register (email, password) {
    return fetch("http://api.eugene.gordievsky.students.nomoreparties.space/signup", {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((res) => this._checkResponse(res))
  }

  authorize (email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((res) => this._checkResponse(res))
  }

  checkToken () {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._options.headers,
    })
    .then((res) => this._checkResponse(res))
  }
}

export const auth = new Auth({
  baseUrl: "http://api.eugene.gordievsky.students.nomoreparties.space",
  headers: {
    'Content-Type': 'application/json'
  }
})
