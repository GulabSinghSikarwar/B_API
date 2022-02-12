const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const MongoConnect = require('./utils/database').mongoConnect


const session = require("express-session");

const mongodbStore = require("connect-mongodb-session")(session);

const routes = require('./routes/routes');





const URI = "mongodb://127.0.0.1:27017/BaazUserSessions";

const store = new mongodbStore({
    uri: URI,
    collection: "sessions"
})

app.use(
    session({
        secret: "my session-session ",
        resave: true,
        saveUninitialized: false,
        store: store,
        cookie: {
            expires: new Date(Date.now() + 3600000),
            maxAge: 3600000,


        }



    })


);
// 3600000

// console.log(session.cookie.expires); 
app.use(bodyParser.json())

app.use((req, resp, next) => {
    console.log(req.session.user);
    next()

})


app.use(routes);


MongoConnect().then((client) => {
    app.listen("3000")
})