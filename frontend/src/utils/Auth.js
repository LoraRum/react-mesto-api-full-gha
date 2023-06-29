import localhost from "../constans/constans";
class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    async _handleError(response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return response.json();
    }

    async register(email, password) {
        const response = await fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
        });

        return this._handleError(response);
    }

    async authorize(email, password) {
        const response = await fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
        });

        return this._handleError(response);
    }

    async checkToken(token) {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return await this._handleError(response);
    }
}

const auth = new Auth({
    baseUrl: localhost,
});

export default auth;
