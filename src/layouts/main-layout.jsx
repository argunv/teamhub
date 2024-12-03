import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './main-layout.css';
import { useDispatch, useSelector } from "react-redux";
import { dropToken, getToken } from "../store/token";
import Footer from "../components/footer/Footer";
import { setUser } from "../store/store";
import { Text } from "@consta/uikit/Text";
import Menu from "../components/menu/Menu";


const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const userToken = getToken();

  useEffect(() => {
    // Если пользователь уже есть, просто заканчиваем загрузку
    if (user) {
      setLoading(false);
      return;
    }

    // Запрашиваем информацию о пользователе
    const fetchUserInfo = async () => {
      if (!userToken) {
        console.error("Токен не найден");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken['accessToken']}`,
          },
        });

        if (!response.ok) {
          // Сбрасываем состояние пользователя при ошибке
          dispatch(setUser(null));
          throw new Error("Не удалось загрузить информацию о пользователе");
        }

        const userInfo = await response.json();
        dispatch(setUser(userInfo));
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate, user, userToken]);

  const handleLogout = () => {
    dropToken();
    dispatch(setUser(null)); // Сбрасываем пользователя в Redux
    navigate("/login"); // Перенаправляем на страницу логина
  };

  if (loading) {
    return <Text size="l">Загрузка...</Text>;
  }

  return (
      <div>
        <Menu user={user} handleLogout={handleLogout}/>
        <hr className="divider"/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
  );
}

export default MainLayout;
