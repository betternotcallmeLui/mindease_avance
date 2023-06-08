const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const fetch = require('node-fetch');

const api_key = require('../config/config');
const SecurityModel = require('../models/security.model');
const UserModel = require('../models/user.model');
const SpecialistModel = require('../models/specialist.model');

sgMail.setApiKey(api_key.sendgrid);

exports.signup = async (req, res) => {
  const adminEmail = "mindease@tutoripolis.com";

  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password || !username) {
      return res.status(422).json({ message: 'Validación fallida. Todos los campos son obligatorios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const NewUser = new UserModel({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      isVerified: false,
      resetVerified: false
    });

    await NewUser.save();
    console.log(`Detalles del usuario ${firstName} guardados en la base de datos.`);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const OTP = new SecurityModel({
      otp: otp,
      email: email
    });

    await OTP.save();

    res.status(201).json({ message: `El OTP ${otp} se ha enviado a tu correo.` });

    await sgMail.send({
      to: email,
      from: adminEmail,
      subject: "Verificación OTP para MindEase.",
      html: `
                <p style="font-size:50px">Verificación</p>
                <p style="font-size:25px">¡Te damos la bienvenida a MindEase!</p>
                <p style="font-size:25px">Este es tu código de verificación: ${otp}</p>
            `
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};



exports.specialistSignup = async (req, res, next) => {
  const adminEmail = "mindease@tutoripolis.com";

  try {
    const { email, name, patternSurname, matternSurname, license, password } = req.body;

    if (!email || !name || !matternSurname || !license || !password || !patternSurname) {
      return res.status(422).json({ message: "Validación fallida. Todos los campos son obligatorios." });
    }

    const existingSpecialist = await SpecialistModel.findOne({ email });
    if (existingSpecialist) {
      return res.status(409).json({ message: "El correo electrónico ya está en uso." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo electrónico ya está en uso en el módulo de usuarios." });
    }
    
    const licenseCount = await SpecialistModel.countDocuments({ license });
    if (licenseCount >= 2) {
      return res.status(409).json({ message: "La licencia ya está registrada en 2 cuentas. No puedes crear más cuentas con la misma licencia." });
    }

    const requestData = {
      idCedula: license
    };

    const response = await fetch(`https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action?json=%7B%22maxResult%22:%221000%22,%22nombre%22:%22${name}%22,%22paterno%22:%22${patternSurname}%22,%22materno%22:%22${matternSurname}%22,%22idCedula%22:%22${license}%22%7D`);

    const data = await response.json();
    console.log(data)

    const hashedPassword = await bcrypt.hash(password, 12);
    const NewSpecialist = new SpecialistModel({
      email,
      name,
      patternSurname,
      matternSurname,
      license,
      password: hashedPassword,
      isVerified: false,
      resetVerified: false
    });

    await NewSpecialist.save();
    console.log(`Detalles del especialista, ${name} guardados en la base de datos.`);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const OTP = new SecurityModel({
      otp: otp,
      email: email
    });

    await OTP.save();

    res.status(201).json({ message: `El OTP ${otp} se ha enviado a tu correo.` });

    await sgMail.send({
      to: email,
      from: adminEmail,
      subject: "Verificación OTP para MindEase.",
      html: `
                <p style="font-size:50px">Verificación</p>
                <p style="font-size:25px">¡Te damos la bienvenida a MindEase!</p>
                <p style="font-size:25px">Este es tu código de verificación: ${otp}</p>
            `
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};



exports.otpVerification = async (req, res, next) => {
  try {
    const receivedOTP = req.body.otp;
    const email = req.body.email;

    console.log(receivedOTP, email);

    let user = await SecurityModel.findOne({ email: email });

    if (!user) {
      const error = new Error("Validación fallida, este usuario no existe.");
      error.statusCode = 403;
      error.data = {
        value: receivedOTP,
        message: "Correo inválido.",
        param: "otp",
        location: "otpVerification",
      };
      res.status(422).json({ message: error.data });
      throw error;
    }

    if (user.otp !== receivedOTP) {
      const error = new Error("El OTP es erróneo");
      error.statusCode = 401;
      res.status(401).json({ message: "El OTP es erróneo " });
      error.data = {
        value: receivedOTP,
        message: "OTP incorrecto.",
        param: "otp",
        location: "otp",
      };
      throw error;
    } else {
      let userResult = await UserModel.findOne({ email: email });

      if (!userResult) {
        userResult = await SpecialistModel.findOne({ email: email });
      }

      if (!userResult) {
        const error = new Error("Validación fallida, este usuario no existe.");
        error.statusCode = 403;
        error.data = {
          value: receivedOTP,
          message: "Correo inválido.",
          param: "otp",
          location: "otpVerification",
        };
        res.status(422).json({ message: error.data });
        throw error;
      }

      userResult.isVerified = true;
      const access_token = jwt.sign(
        { email: email, userId: userResult._id },
        api_key.accessToken,
        {
          algorithm: "HS256",
          expiresIn: api_key.accessTokenLife,
        }
      );
      const referesh_token = jwt.sign({ email: email }, api_key.refreshToken, {
        algorithm: "HS256",
        expiresIn: api_key.refreshTokenLife,
      });
      await userResult.save();
      let username = "";
      if (userResult.constructor.modelName === "SpecialistModel") {
        username = userResult.name;
      } else {
        username = userResult.firstName;
      }
      return res.status(200).json({
        message: "El OTP es correcto, usuario añadido",
        access_token: access_token,
        referesh_token: referesh_token,
        userId: userResult._id.toString(),
        username: username,
      });
    }
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.resendOTP = async (req, res, next) => {

  const adminEmail = "mindease@tutoripolis.com"

  try {
    const email = req.body.email;
    const receivedOTP = req.body.otp;
    let otp = null;

    const user = await SecurityModel.findOne({ email: email });
    if (!user) {
      const error = new Error("El correo no existe");
      error.statusCode = 401;
      error.data = {
        value: receivedOTP,
        message: "Correo inválido.",
        param: "otp",
        location: "otpVerification",
      };
      res.status(401).json({ message: "El correo no existe" });
      throw error;
    }
    otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    await user.save();
    console.log(otp);
    res.status(201).json({ message: "OTP enviado a tu correo" });

    await sgMail.send({
      to: email,
      from: adminEmail,
      subject: "Verificación OTP para MindEase.",
      html: `
                <p style="font-size:50px">Verificación</p>
                <p style="font-size:25px ">!Te damos la bienvenida a MindEase!</p>
                <p style="font-size:25px">Este es tu código de verificación: ${otp}</p>
            `
    });

  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const adminEmail = "mindease@tutoripolis.com";

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Debe proporcionar un correo electrónico y una contraseña" });
    }

    let user = await UserModel.findOne({ email: email });
    let isSpecialist = false;

    if (!user) {
      user = await SpecialistModel.findOne({ email: email });
      isSpecialist = true;
    }

    if (!user) {
      return res.status(422).json({ message: "No existe un usuario con este correo." });
    }

    if (user.isVerified === false) {
      console.log("El usuario no está verificado");

      let otp = Math.floor(100000 + Math.random() * 900000);

      console.log(`El OTP para la verificación es el siguiente: ${otp}`);

      const otpUser = await SecurityModel.findOne({ email: email });

      if (!otpUser) {
        const OTP = new SecurityModel({
          otp: otp,
          email: email,
        });

        await OTP.save();

        await sgMail.send({
          to: email,
          from: adminEmail,
          subject: "Verificación OTP para MindEase.",
          html: `
                        <p style="font-size:50px">Verificación</p>
                        <p style="font-size:25px ">¡Te damos la bienvenida a MindEase!</p>
                        <p style="font-size:25px">Este es tu código de verificación: ${otp}</p>
                    `
        });

        console.log(`Se ha enviado el OTP ${otp} al correo.`);

        return res.status(422).json({
          message: "No te has verificado con un OTP, se ha reenviado un correo con un nuevo OTP.",
          redirect: true,
        });

      } else {
        otpUser.otp = otp;

        await otpUser.save();

        await sgMail.send({
          to: email,
          from: adminEmail,
          subject: "Verificación OTP para MindEase.",
          html: `
                        <p style="font-size:50px">Verificación</p>
                        <p style="font-size:25px ">¡Te damos la bienvenida a MindEase!</p>
                        <p style="font-size:25px">Este es tu código de verificación: ${otp}</p>
                    `
        });

        return res.status(422).json({
          message: "No te has verificado con un OTP, se ha reenviado un correo con un nuevo OTP.",
          redirect: true,
        });
      }

    } else {
      const matchPass = await bcrypt.compare(password, user.password);
      if (matchPass) {
        const access_token = jwt.sign({ email: email }, api_key.accessToken, {
          algorithm: "HS256",
          expiresIn: api_key.accessTokenLife,
        });
        const referesh_token = jwt.sign(
          { email: email },
          api_key.refreshToken,
          {
            algorithm: "HS256",
            expiresIn: api_key.refreshTokenLife,
          }
        );
        let username = "";
        if (isSpecialist) {
          username = user.name;
        } else {
          username = user.firstName;
        }
        return res.status(201).json({
          message: "Usuario loggeado",
          access_token: access_token,
          referesh_token: referesh_token,
          username: username,
          userId: user._id,
        });
      } else {
        return res.status(401).json({ message: "Las contraseñas no coinciden" });
      }
    }
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.resetPassword = async (req, res, next) => {

  const adminEmail = "mindease@tutoripolis.com"

  try {
    const { firstName, email } = req.body;

    let otp = Math.floor(100000 + Math.random() * 900000);

    const user = await SecurityModel.findOne({ email: email });

    if (!user) {

      const error = new Error("Validación fallida");
      error.statusCode = 401;

      res.status(401).json({ message: "El usuario no existe" });

      error.data = {
        value: email,
        message: " El OTP es incorrecto",
      };

      res.status(422).json({ message: " El usuario no existe" });
      throw error;

    } else {
      const new_otp = new SecurityModel({
        otp: otp,
        email: email,
      });
      await new_otp.save();
    }

    await sgMail.send({
      to: email,
      from: adminEmail,
      subject: `¿Qué tal, ${firstName}? Cambia tu contraseña de MindEase.`,
      html: `
                <p style="font-size:50px">Recuperación de contraseña</p>
                <p style="font-size:25px">Restablece tu contraseña con el siguiente código: ${otp}</p>
            `,
    });

    console.log(`El otp, ${otp}, se ha enviado a su correo.`);

    res.status(201).json({ message: "Se ha enviado el código a tu correo." });
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.resetOtpVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    console.log("Cambiar:", otp);

    const user = await SecurityModel.findOne({ email: email });
    if (!user) {
      const error = new Error("Validación fallida");

      error.statusCode = 401;

      res.status(401).json({ message: "El OTP es incorrecto" });
      error.data = {
        value: email,
        message: "OTP incorrecto",
      };

      res.status(422).json({ message: "El OTP es incorrecto o ha expirado" });
      throw error;
    }
    if (user.otp == otp) {
      const matched = await UserModel.findOne({ email: email });
      matched.resetVerified = true;
      await matched.save();
      res.status(201).json({ message: "Correo verificado", email: email });
    } else {
      res.status(402).json({ message: "OTP incorrecto", email: email });
    }
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.newPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    let resetUser;
    let user = await UserModel.findOne({ email: email });

    if (!user) {
      user = await SpecialistModel.findOne({ email: email });
    }

    if (!user) {
      const error = new Error("El usuario con este correo no existe.");
      error.statusCode = 401;
      res.status(401).json({ message: "El usuario con este correo no existe." });

      error.data = {
        value: email,
        message: "El usuario con este correo no existe.",
      };

      res.status(422).json({ message: "El usuario no existe" });
      throw error;
    }

    if (user.resetVerified) {
      resetUser = user;
      resetUser.resetVerified = false;
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      resetUser.password = hashedPassword;

      await resetUser.save();
      console.log("result", result);
      res.status(201).json({ message: "La contraseña se cambió exitosamente" });
    } else {
      console.log("Por favor, verifica tu correo primero.");
      res.status(401).json({ message: "Por favor, verifica tu correo primero. " });
    }
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
