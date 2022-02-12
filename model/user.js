const mongodb = require('mongodb')
const { get } = require('express/lib/response');

const getdb = require('../utils/database').getdb
module.exports = class User {

    constructor(username, password, image) {
        this.username = username;
        this.password = password;
        this.date = new Date().toISOString;
        this.iamge = image;



    }

    register() {
        const db = getdb();
        return db.collection('users').findOne({ username: this.username }).then((user) => {
            if (user) {
                return Promise.resolve("User Exsist with This Username")
            }
            return db.collection('users').insertOne(this).then((result) => {
                return result;

            }).catch((err) => { console.log(err); })
        }).catch((err) => { console.log(err); })

    }
    static login(username, password) {
        const db = getdb();
        return db.collection('users').findOne({ username: username }).then((user) => {


            if (!user) {
                return Promise.reject("Wrong Email ")
            } else {
                let matched = false;
                if (user.password === password) {
                    matched = true;
                    db.collection('login_record').insertOne({ user_id: user._id, time: new Date(Date.now()) }).then((result) => {

                    }).catch((err) => { console.log(err) })
                    return Promise.resolve(user);

                } else {
                    return Promise.reject("Wrong Email or Password ")
                }

            }

        }).catch((err) => { console.log(err); })

    }

    static resetPassword(username, newpassword) {
        const db = getdb();
        return db.collection('users').findOne({ username: username }).then((user) => {

            return db.collection("users")
                .updateOne({ username: username }, { $set: { password: newpassword } }, ).then((result) => {
                    console.log(result,
                        user);
                    return result


                }).catch((err) => {
                    console.log(err);
                });

        }).catch((err) => { console.log(err); })

    }
    static getUserInfo(id) {
        const db = getdb();

        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) }).then((user) => {

            return db.collection('login_record').find({ user_id: new mongodb.ObjectId(user._id) }).toArray().then((time_records) => {
                return {
                    user_data: {...user },
                    user_login_record: [...time_records]
                }

            }).catch((time_records_err) => { console.log(time_records_err) })


        }).catch((err) => {

        })



    }


}