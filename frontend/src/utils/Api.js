import localhost from "../constans/constans";

class Api {
    constructor({baseUrl, headers, token}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._token = token;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._handleResponse);
    }

    updateUserInfo({name, about}) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name, about}),
        });
    }

    editAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        });
    }

    addCard({name, link}) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link}),
        });
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        });
    }

    removeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    dislikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    setToken(token) {
        this._token = token;
        this._headers.authorization = `Bearer ${token}`;
    }
}

const api = new Api({
    baseUrl: localhost,
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;