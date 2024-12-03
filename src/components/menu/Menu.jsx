import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@consta/uikit/Layout";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";
import './Menu.css';

const Menu = ({ user, handleLogout }) => {
    return (
        <Layout className="menu">
            {/* Группа кнопок навигации */}
            <Layout flex={1} className="button-group">
                {[
                    { to: "/", label: "Главная страница" },
                    { to: "/services", label: "Услуги компании" },
                ].map((link, index) => (
                    <Link to={link.to} className="nav-button button-margin" key={index}>
                        <Button label={link.label} className="nav-button" />
                    </Link>
                ))}
            </Layout>

            {/* Кнопки профиля и авторизации */}
            <Layout flex={0} className="button-group">
                <Link to={user ? "/profile" : "/login"} className="nav-button button-margin">
                    <Button
                        label={
                            user ? <User name={user.firstName} avatarUrl={user.image} /> : "Вход"
                        }
                        className="nav-button profile-button"
                    />
                </Link>
                {user && (
                    <Button
                        label="Выход"
                        className="nav-button button-margin"
                        onClick={handleLogout}
                    />
                )}
            </Layout>
        </Layout>
    );
};

export default Menu;
