import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './SignupPage.css'

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notify, setNotify] = useState('');
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [otp, setOTP] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(username)) {
            setNotify('El nombre de usuario solo puede contener letras y números.');
            return;
        }

        if (!emailRegex.test(email)) {
            setNotify('Ingresa un correo electrónico válido.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setNotify('La contraseña solo puede contener letras y números.');
            return;
        }

        if (password !== confirmPassword) {
            setNotify('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', {
                username,
                firstName,
                lastName,
                email,
                password,
            });

            localStorage.setItem('username', username);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);

            setNotify(response.data.message);
            setShowOTPForm(true);
        } catch (error) {
            setNotify(error.response.data.message);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/signup/otp', {
                otp,
                email
            });

            navigate("/community")
            navigate(0)
            setNotify(response.data.message);
        } catch (error) {
            setNotify(error.response.data.message);
        }
    };

    return (
        <div className="me_signupPage">
            <div className="signupPage">
                <div className="signupPage_container">
                    <div className="signupPage_container_left">
                        <p className="signupPage_left_title">MindEase</p>
                        <div className="signupPage_left_mini">
                            <p className="signupPage_left_mini_title">MindBot</p>
                            <p className="signupPage_left_mini_desc">
                                ¡MindBot que será tu amigo de confianza! MindEase te ofrece un compañero virtual que está aquí para escucharte y responder como si fuese un amigo. ¿Necesitas desahogarte después de un día difícil? ¿Quieres compartir tus alegrías y logros? Nuestro bot está preparado para estar a tu lado en todas las circunstancias.
                            </p>
                        </div>
                        <div className="signupPage_left_mini">
                            <p className="signupPage_left_mini_title">Directorio</p>
                            <p className="signupPage_left_mini_desc">
                                ¡Encuentra el especialista en salud mental adecuado para ti en nuestro directorio de especialistas! Te proporcionamos información detallada sobre una amplia variedad de lugares de atención, desde clínicas presenciales hasta servicios gratuitos y públicos en diferentes áreas de México.
                            </p>
                        </div>
                        <div className="signupPage_left_mini">
                            <p className="signupPage_left_mini_title">MindCommunity</p>
                            <p className="signupPage_left_mini_desc">
                                ¡Únete a nuestra comunidad en MindEase y descubre un espacio donde encontrarás apoyo, conexión y amistad en México! Aquí podrás interactuar con personas que han experimentado o están pasando por situaciones similares a las tuyas. Nuestra plataforma te brinda la oportunidad de compartir tus experiencias, intereses y preocupaciones, y al mismo tiempo, estar allí para otros que necesitan tu apoyo.
                            </p>
                        </div>
                    </div>
                    <div className="signupPage_container_right">
                        <p className="signupPage_title">Crea tu cuenta de MindEase</p>
                        <div className="signupPage_form">
                            {!showOTPForm ? (
                                <form onSubmit={handleSignup}>
                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Nombre de usuario:</span>
                                        <input
                                            type="text"
                                            value={username}
                                            className="signupPage_input"
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            title="El nombre de usuario solo puede contener letras y números."
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Nombre(s):</span>
                                        <input
                                            type="text"
                                            value={firstName}
                                            className="signupPage_input"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Apellido(s):</span>
                                        <input
                                            type="text"
                                            value={lastName}
                                            className="signupPage_input"
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Correo electrónico:</span>
                                        <input
                                            type="email"
                                            value={email}
                                            className="signupPage_input"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Contraseña:</span>
                                        <input
                                            type="password"
                                            value={password}
                                            className="signupPage_input"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            title="La contraseña solo puede contener letras y números."
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">Repetir contraseña:</span>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            className="signupPage_input"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            title="La contraseña solo puede contener letras y números."
                                        />
                                    </div>

                                    <div className="signupPage_inputContainer">
                                        <button className="signupPage_button" type="submit">
                                            Crear Cuenta
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleOTPSubmit} className="otpForm">
                                    <div className="signupPage_inputContainer">
                                        <span className="signupPage_inputTitle">OTP:</span>
                                        <input
                                            type="text"
                                            value={otp}
                                            className="signupPage_input"
                                            onChange={(e) => setOTP(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="signupPage_inputContainer">
                                        <button className="signupPage_button" type="submit">
                                            Verificar OTP
                                        </button>
                                    </div>
                                </form>
                            )}

                            {notify && <div>{notify}</div>}

                            <div className="signupPage_finalLinks">
                                <p>¿Ya tienes una cuenta?</p>
                                <Link to="/login" className="linkfinal">
                                    Inicia con ella.
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;