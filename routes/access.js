const express = require('express');
const router = express.Router();
const data = require('../data');
const uuid = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

//Register Page
router.get('/signUpPage', async (req, res) => {
    try {
        let artist_data = await data.artists.GetAllArtists();
        let genre_data = await data.genres.GetAllGenres();
        res.render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });

    } catch (e) {
        res.status(401).redirect('/');
    }
});


//Registration Api
router.post("/registration", async (req, res) => {
    try {
        let artist_data = await data.artists.GetAllArtists();
        let genre_data = await data.genres.GetAllGenres();
        if (!req.body.full_name) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.email_address) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.password) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.genres_ids) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.artist_ids) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else {
            let userData = {
                _id: uuid.v4(),
                fullName: req.body.full_name,
                emailAddress: req.body.email_address,
                password: data.encryption.encrypt(req.body.password),
                genres: req.body.genres_ids,  // should be array
                artist: req.body.artist_ids, // should by array
                createDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                isDeleted: 0,
                lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                profileLogo: req.body.profileLogo
            }

            let checkUser = await data.users.CheckUserExist(req.body.email_address);
            if (checkUser == null) {
                let AddUser = await data.users.CreateUser(userData);
                // res.json(AddUser)
                res.render("profile/login", { layout: "main" });
            } else {
                res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data, error_message: "Email Address already exist." });
            }
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

router.post("/login", async (req, res) => {
    try {
        var userData = await data.users.CheckUserExist(req.body.email_address);
        if (userData == null) {
            res.status(401).render("profile/login", { layout: "main", error_message: "Incorrect Username/password." });
        } else {
            let password = data.encryption.decrypt(userData.password);
            if (password == req.body.password) {
                req.session.auth = jwt.sign({ userid: userData._id }, 'secret');
                let getThreadData = await data.threads.GetAllThreads();
                let thread_ids = getThreadData.map(x => x._id);
                let getLikeData = await data.threads.getThreadLikeWise(thread_ids, userData._id);
                let getsubThreadData = await data.threads.GetSubThread(thread_ids);
                getThreadData.forEach(element => {
                    getLikeData.forEach(lelement => {
                        if (element._id == lelement.threadId && element.userId == userData._id) {
                            element["userlike"] = 1
                        }
                    });
                    element["subThread"] = [];
                    getsubThreadData.forEach(selement => {
                        if (element._id == selement.threadId) {
                            element["subThread"].push(selement)
                        }
                    });
                })
                if (getThreadData.length) {
                    res.render("profile/homePage", {
                        auth: req.session.auth,
                        threadData: getThreadData,
                        userID: userData._id
                    });
                } else {
                    res.render("profile/homePage", {
                        auth: req.session.auth,
                        threadData: getThreadData,
                        userID: userData._id,
                        message: "Recently No Forum Post!"
                    });
                }
            } else {
                res.status(404).render("profile/login", { layout: "main", error: "Incorrect email address/password." });
            }
        }
    } catch (e) {
        res.status(404).render("profile/login", { layout: "main" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        let getThreadData = await data.threads.GetAllThreads();
        let thread_ids = getThreadData.map(x => x._id);
        let getsubThreadData = await data.threads.GetSubThread(thread_ids);
        getThreadData.forEach(element => {
            element["subThread"] = [];
            getsubThreadData.forEach(selement => {
                if (element._id == selement.threadId) {
                    element["subThread"].push(selement)
                }
            });
        });
        if (getThreadData.length) {
            res.render('profile/homePage', {
                layout: "main",
                title: "Top Music",
                threadData: getThreadData,
                auth: ""
            });

        } else {

            res.render('profile/homePage', {
                layout: "main",
                title: "Top Music",
                threadData: getThreadData,
                auth: "",
                message: "Recently One Post any Forum. Please Login to post our forum first!"
            });
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

router.post("/forgetPassword", async (req, res) => {
    if (!req.body.email_address) {
        res.status(401).render("profile/forgetPassword", { layout: "main", error: "Please provide email address" });
    } else {
        var userData = await data.users.CheckUserExist(req.body.email_address);
        if (userData == null) {
            res.status(401).render("profile/forgetPassword", { layout: "main", error: "Email address is not valid" });
        } else {
            res.status(401).render("profile/forgetPassword", { layout: "main", email_data: req.body.email_address, user_id: userData._id });
        }
    }
});

router.post("/changePassword", async (req, res) => {
    try {
        if (!req.body.new_password) {
            res.status(401).render("profile/forgetPassword", { layout: "main", error: "Please provide new password.", email_data: req.body.email_address });
        } else {
            let password = data.encryption.encrypt(req.body.new_password)
            var userData = await data.users.updatePassword(req.body.user_id, password);
            if (userData == null) {
                res.render("profile/forgetPassword", { layout: "main", error: "Email address is not valid" });
            } else {
                res.render("profile/login", { layout: "main", message: "Password has been change successfully. Please Login!" });
            }
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

module.exports = router;