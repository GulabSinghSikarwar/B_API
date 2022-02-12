const express = require('express');


// const User = require('../model/user');
const router = express.Router()

const User = require('../model/user')

router.post('/register', (req, resp, next) => {
    const username = req.body.username;


    if (!(username.length >= 3 && username.length <= 25)) {
        resp.status(400).json({ message: "Username should  be between 3 and 25" })
    } else {

        const password = req.body.password;

        const image_url = req.body.image




        const user = new User(username, password, image_url)



        user.register().then((result) => {
            console.log(result);

            resp.status(201).json(result);


        }).catch((err) => {
            console.log(err);

        });



    }


})
router.post('/login', (req, resp, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.login(username, password).then((result) => {
        req.session.isLoggedIn = true;
        req.session.user = result;
        resp.status(200).json(result);




    }).catch((err) => {
        console.log(err);

    })


})

router.post('/reset', (req, resp, next) => {
    let password = req.body.password;
    let username = req.body.username;
    console.log("password");
    if (req.session.isLoggedIn) {
        console.log("already login ");


        User.resetPassword(username, password).then((result) => {
            resp.status(200).json(result);


        })


    } else {
        console.log("logeed out");
        resp.status(400).json("No User")
    }

})
router.get('/', (req, resp, next) => {
    resp.json("Home")
})
router.get('/getData', (req, resp, next) => {

    console.log(" req.session .user", req.session.user);
    const id = req.session.user._id;

    console.log("req  session user: ", req.session.user);
    User.getUserInfo(id).then((userdata) => {
        resp.status(200).json(userdata)

    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;