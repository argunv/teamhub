import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from "../../store/token";
import './LoginPage.css';
import { TextField } from "@consta/uikit/TextField";
import { presetGpnDefault, Theme } from "@consta/uikit/Theme";
import { Button } from "@consta/uikit/Button";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getUserToken = async (user, pass) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass,
          expiresInMins: 60,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Неверные данные пользователя!');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Пожалуйста, введите логин и пароль.');
      return;
    }

    try {
      const token = await getUserToken(username, password);
      saveToken(token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <Theme preset={presetGpnDefault}>
        <div className="login-page">
          <h1 className="login-page__title">Вход</h1>
          <form className="login-page__form" onSubmit={onFormSubmit}>
            <TextField
                type="text"
                label="Логин"
                placeholder="Введите логин"
                size="l"
                className="login-page__input"
                value={username}
                onChange={(e) => setUsername(e)}
            />
            <TextField
                type="password"
                label="Пароль"
                placeholder="Введите пароль"
                size="l"
                className="login-page__input"
                value={password}
                onChange={(e) => setPassword(e)}
            />
            <Button
                label="Войти"
                size="l"
                className="login-page__button"
                type="submit"
            />
            {error && <p className="loading-text error-text">{error}</p>}
          </form>
        </div>
      </Theme>
  );
};

export default LoginPage;