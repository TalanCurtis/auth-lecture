require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
// Auth0Strategy is uppercase because it is a Constructor function
const Auth0Strategy = require('passport-auth0')
const app = express()
// Middle ware import

// Use top level middleware
///////////// AUTH0 ---you need all this for AUTH 0 ////////////////////////
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
// this line allows passport to hijack our session and use it.
app.use(passport.session());

// you get domain, clientID, clientSecret values from your auth0 account under settings.
// you need to go  auth0 in settings Allowed Callback URLs ='http://localhost:3004/auth/callback'
// and in advanced settings  under OAuth disable OIDC Conformant.
const { DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    // done acts like the next, its a callback function.
    done(null, profile);
}))

passport.serializeUser(( profile, done)=>{
    done(null, profile);
})

passport.deserializeUser(( profile, done)=>{
    done(null, profile);
})
//////////////////////////// AUTH0 END///////////////////

// add endpoints
// you can use one endpoint to redeirect after
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    //we need to use full url http://localhost only needed for auth endpoints
    successRedirect:'http://localhost:3000'
}))


// Set server to listen
const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => { console.log(`jammin on port: ${SERVER_PORT}`) })