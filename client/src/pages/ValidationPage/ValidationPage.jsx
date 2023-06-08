import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ValidationPage() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        valid: localStorage.getItem('valid'),
        msg: localStorage.getItem('msg'),
        alertType: localStorage.getItem('type'),
    });
    const navigate = useNavigate();

    const AlertError = (alertmsg, alertType) => {
        setAlert({
            msg: alertmsg,
            valid: true,
            alertType: alertType
        });
    };

    const handleOtpSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = {
            otp: otp,
            token: localStorage.getItem('token'),
            email: localStorage.getItem('email')
        };

        axios.post('http://localhost:8000/signup/otp', formData)
            .then(response => {
                setLoading(false);
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('valid');
                localStorage.removeItem('msg');
                localStorage.removeItem('type');
                localStorage.setItem('user', response.data.access_token);
                localStorage.setItem('ref_token', response.data.referesh_token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userName', response.data.username);
                navigate('/HomePage');
            })
            .catch(error => {
                setLoading(false);
                AlertError(error.response.data.message, "danger");
            });
    };

    const resendOtp = () => {
        const formData = {
            token: localStorage.getItem('token'),
            email: localStorage.getItem('email')
        };

        axios.post('http://localhost:8000/signup/otp-resend', formData)
            .then(response => {
                AlertError("Revisa tu correo, el OTP ha sido reenviado.", "success");
                if (response.status === 201 || response.status === 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                } else {
                    alert("Algo salió mal");
                }
            })
            .catch(error => {
                AlertError("Asegúrate que las validaciones sean correctas.", "warning");
            });
    };

    let alertContent = null;
    let value = 0;
    value = !value;
    if (alert.valid) {
        alertContent = (
            <div className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        );
    }

    if (localStorage.getItem("token") && localStorage.getItem("email")) {
        return <Navigate to="/signup/otp" />;
    }

    let submitButton = (
        <button className="submit-btn" type="submit">Confirma el OTP</button>
    );

    if (loading) {
        submitButton = <div className="spinner"></div>;
    }

    return (
        <div className="otp-page" style={{
            marginTop: "100px"
        }}>
            {alertContent}
            <div className="side-content">
                <h1>Por favor, verifica tu correo</h1>
                <form onSubmit={handleOtpSubmit}>
                    <input
                        type="text"
                        placeholder="Ingresa tu OTP"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                    />
                    <p className="forgot-password" onClick={resendOtp}>
                        ¿Reenviar OTP?
                    </p>
                    {submitButton}
                    <p className="account-login">
                        <Link to="/login">¿Ya tienes una cuenta? Ingresa</Link>
                    </p>
                    <hr />
                </form>
            </div>
        </div>
    );
}

export default ValidationPage;
