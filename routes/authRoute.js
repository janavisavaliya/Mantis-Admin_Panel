const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, forgotPassword, otp, postOtp, newPasswordPage, postNewpassword, forgotPasswordPage } = require('../controller/authController');

const passport = require('passport');

routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.get('/dashboard', dashboardPage)
routes.get('/forgotpassword', forgotPasswordPage)
routes.post('/registeruser', registerUser)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/logout', logoutUser)
routes.post('/forgotpassword', forgotPassword)
routes.get('/otp', otp);
routes.post('/postotp', postOtp);
routes.get('/newpassword', newPasswordPage);
routes.post('/postnewpassword', postNewpassword)

module.exports = routes;