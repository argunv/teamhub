// token.jsx

const AUTH_TOKEN_KEY_NAME = 'lk-sirius-token';

export const saveToken = (tokenData) => {
    if (tokenData && tokenData['accessToken']) {
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, JSON.stringify(tokenData));
    } else {
        console.error('Invalid token data:', tokenData);
    }
};

export const getToken = () => {
    const tokenString = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!tokenString || tokenString === 'undefined') {
        return null;
    }
    try {
        return JSON.parse(tokenString);
    } catch (error) {
        console.error('Error parsing token from localStorage:', error);
        return null;
    }
};

export const dropToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};