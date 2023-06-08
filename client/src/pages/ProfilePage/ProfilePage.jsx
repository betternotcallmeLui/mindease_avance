import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ProfilePage.css';

function ProfilePage() {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [usernameForm, setUsernameForm] = useState('');
    const [firstNameForm, setFirstNameForm] = useState('');
    const [lastNameForm, setLastNameForm] = useState('');
    const [emailForm, setEmailForm] = useState('');

    let userId = localStorage.getItem('userId');
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');

    const handleEditAccount = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/editAccount`, {
                usernameForm,
                firstNameForm,
                lastNameForm,
                emailForm,
            })
            .then((response) => {
                username = localStoraget.setItem("username");
                email = localStoraget.setItem("email");
                firstName = localStoraget.setItem("firstName");
                lastName = localStoraget.setItem("lastName");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="me_profilePage">
            <div className="profilePage">
                <div className="profilePage_container">
                    <div className="profileData_container">
                        <p className="profilePage_title">Perfil</p>
                        <p className="profilePage_username">
                            <span>Nombre de usuario: </span>
                            {username}
                        </p>
                        <p className="profilePage_username">
                            <span>Correo del usuario: </span>
                            {email}
                        </p>
                        <p className="profilePage_username">
                            <span>Nombre completo del usuario: </span>
                            {firstName + ' ' + lastName}
                        </p>
                    </div>
                    <div className="profileButtons_container">
                        <button
                            className="signupPage_button profileButton"
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('username');
                                localStorage.removeItem('userId');
                                navigate('/');
                                navigate(0);
                            }}
                        >
                            Cerrar Sesión
                        </button>
                        {/* <button
                            className="signupPage_button profileButton"
                            onClick={() => setShowForm(true)}
                        >
                            Editar Cuenta
                        </button> */}
                    </div>
                </div>
                {showForm && (
                    <form className="signupPage_form" onSubmit={handleEditAccount}>
                        <div className="signupPage_inputContainer">
                            <label htmlFor="usernameForm" className='signupPage_inputTitle'>Nombre de usuario:</label>
                            <input
                                type="text"
                                id="usernameForm"
                                className="signupPage_input"
                                value={usernameForm}
                                onChange={(e) => setUsernameForm(e.target.value)}
                            />
                        </div>
                        <div className="signupPage_inputContainer">
                            <label htmlFor="firstNameForm" className='signupPage_inputTitle'>Nombre:</label>
                            <input
                                type="text"
                                id="firstNameForm"
                                className='signupPage_input'
                                value={firstNameForm}
                                onChange={(e) => setFirstNameForm(e.target.value)}
                            />
                        </div>
                        <div className="signupPage_inputContainer">
                            <label htmlFor="lastNameForm" className='signupPage_inputTitle'>Apellido:</label>
                            <input
                                type="text"
                                id="lastNameForm"
                                className='signupPage_input'
                                value={lastNameForm}
                                onChange={(e) => setLastNameForm(e.target.value)}
                            />
                        </div>
                        <div className="signupPage_inputContainer">
                            <label htmlFor="emailForm" className='signupPage_inputTitle'>Correo electrónico:</label>
                            <input
                                type="email"
                                id="emailForm"
                                className='signupPage_input'
                                value={emailForm}
                                onChange={(e) => setEmailForm(e.target.value)}

                            />
                        </div>
                        <div className="signupPage_inputContainer">
                            <button className='signupPage_button'>Guardar cambios</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
