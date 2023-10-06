class Api {
  constructor(options) {
    // cuerpo del constructor
    this._baseURL = options.baseUrl;
    this._headers = options.headers;
  }

  _handleFetch(endPoint, method, body) {
    return fetch(this._baseURL + endPoint, {
      method: method,
      headers: this._headers,
      body: body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._handleFetch("/cards");
  }

  getInitialUserMe() {
    return this._handleFetch("/users/me");
  }

  setUserInfo(name, about) {
    return this._handleFetch(
      "/users/me",
      "PATCH",
      JSON.stringify({
        name: name,
        about: about,
      })
    );
  }

  postNewCard(name, link) {
    return this._handleFetch(
      "/cards",
      "POST",
      JSON.stringify({
        name: name,
        link: link,
      })
    );
  }

  deleteCard(cardId) {
    return this._handleFetch("/cards/" + cardId, "DELETE");
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      return this._handleFetch("/cards/likes/" + cardId, "PUT");
    } else {
      return this._handleFetch("/cards/likes/" + cardId, "DELETE");
    }
  }

  updateUserMeAvatar(avatar) {
    return this._handleFetch(
      "/users/me/avatar",
      "PATCH",
      JSON.stringify({
        avatar: avatar,
      })
    );
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_03",
  headers: {
    authorization: "361c2497-73b4-4dd1-9a02-2225ff5963b5",
    "Content-Type": "application/json",
  },
});

export default api;
