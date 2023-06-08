import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa'

import './Header.css';

function Header() {
    const [loggedIn, setLoggedIn] = useState(false); 

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div className="me_header">
            <div className="header">
                <div className="header_container">
                    <div className="header_logo_container">
                        <Link className="header_logo" to="/">MindEase</Link>
                    </div>
                    <div className="header_links">
                        <Link className="header_link" to="/directory">Directorio</Link>
                        <Link className="header_link" to="/blog">MindBlog</Link>
                        <Link className="header_link" to="/community">MindCommunity</Link>
                        <Link className="header_link" to="/us">Acerca de</Link>
                        <Link className="header_link" to="/contact">Contacto</Link>
                        {loggedIn ? (
                            <>
                                <Link className="header_button" to="/savedPosts">Posts Guardados</Link>
                                <Link className="header_button" to="/submittedPosts">Tus Posts</Link>
                                <Link className="header_button_profile" to="/profile">
                                    <FaUser />
                                </Link>
                            </>
                        )
                            :
                            <>
                                <Link className="header_button" to="/signup">Crear Cuenta</Link>
                                <Link className="header_button" to="/login">Iniciar Sesión</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
