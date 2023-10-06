class Api {
  constructor(options) {
    // cuerpo del constructor
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
  }

  _handleFetch(endPoint, method = 'GET', body = null, token) {
    return fetch(this._baseURL + endPoint, {
      method: method,
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards(token) {
    return this._handleFetch('/cards', 'GET', null, token);
  }

  getInitialUserMe(token) {
    return this._handleFetch('/users/me', 'GET', null, token);
  }

  setUserInfo(name, about, token) {
    return this._handleFetch(
      '/users/me',
      'PATCH',
      JSON.stringify({
        name: name,
        about: about,
      }),
      token
    );
  }

  postNewCard(name, link, token) {
    return this._handleFetch(
      '/cards',
      'POST',
      JSON.stringify({
        name: name,
        link: link,
      }),
      token
    );
  }

  deleteCard(cardId, token) {
    return this._handleFetch('/cards/' + cardId, 'DELETE', token);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked === true) {
      return this._handleFetch('/cards/likes/' + cardId, 'PUT', token);
    } else {
      return this._handleFetch('/cards/likes/' + cardId, 'DELETE', token);
    }
  }

  updateUserMeAvatar(avatar, token) {
    return this._handleFetch(
      '/users/me/avatar',
      'PATCH',
      JSON.stringify({
        avatar: avatar,
      }),
      token
    );
  }
}

const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json',
  },
});

export default api;
