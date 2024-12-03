import React from 'react';
import './Footer.css';
import { Button } from "@consta/uikit/Button";
import {Link} from "react-router-dom";
import {Layout} from "@consta/uikit/Layout";

const FooterBlock = () => {
    return (
        <footer className="footer">
            <div className="footer_blocks">
                <Layout flex={1} className="button-group">
                    {[
                        {to: "/", label: "Главная страница"},
                        {to: "/services", label: "Услуги компании"},
                    ].map((link, index) => (
                        <Link to={link.to} className="nav-button button-margin" key={index}>
                            <Button label={link.label} className="nav-button"/>
                        </Link>
                    ))}

                </Layout>
            </div>
            <p>© 2024 GitHub. All rights reserved.</p>
        </footer>
    );
};

export default FooterBlock;
