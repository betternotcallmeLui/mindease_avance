const jwt = require('jsonwebtoken');

const api_key = require('../config/config');

exports.protect = async (req, res, next) => {
    try {
        const access_token = req.headers["authorization"];

        if (!access_token) {
            return res.status(401).json({ message: "No autenticado." });
        }

        const token = access_token.split(' ')[1];
        const payload = jwt.verify(token, api_key.accessToken);

        if (!payload) {
            return res.status(401).json({ message: "No autenticado." });
        }

        req.userID = payload.username;
        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};

exports.getnewAccessToken = (req, res, next) => {
    try {
        const refresh_token = req.body.refresh_token;

        if (!refresh_token) {
            return res.status(401).json({ message: "No autenticado." });
        }

        jwt.verify(refresh_token, api_key.refreshToken, (err, decoded) => {
            if (err) {
                const error = new Error("No autenticado.");
                error.statusCode = 401;
                next(error);
            } else {
                const access_token = jwt.sign(
                    { email: decoded.email },
                    api_key.accessToken,
                    {
                        algorithm: "HS256",
                        expiresIn: api_key.accessTokenLife
                    }
                );

                const referesh_token = jwt.sign(
                    { email: decoded.email },
                    api_key.refreshToken,
                    {
                        algorithm: "HS256",
                        expiresIn: api_key.refreshTokenLife
                    }
                );

                res.status(200).json({
                    message: "Token obtenido con éxito.",
                    access_token: access_token,
                    refresh_token: referesh_token
                });
            }
        });
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};