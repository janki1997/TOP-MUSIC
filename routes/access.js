const express = require('express');
const router = express.Router();
const data = require('../data');
const uuid = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');


//Register Page
router.get('/signUpPage', async (req, res) => {
	try {
        let artist_data = await data.accessData.GetAllArtists();
        let genre_data = await data.accessData.GetAllGeners();
        res.render(("signUpPage", {layout : "main", artist_data : artist_data, genre_data : genre_data}));
	
	} catch (e) {
        res.status(404).render(("main_pagr/signUpPage", {layout : "main"}));
	}
});

//Registration Api
router.post("/registration", async (req, res) => {
        try {
                if (!req.body.full_name) {
                        res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": "Please provide full name." });
                } else if (!req.body.email_address) {
                        res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": "Please provide email address." });
                } else if (!req.body.password) {
                        res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": "Please provide password." });
                } else if (!req.body.genres_ids.length) {
                        res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": "Please provide genres information." });
                } else if (!req.body.artist_ids.length) {
                        res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": "Please provide artist information." });
                } else {
                        let userData = {
                                _id: uuid.v4(),
                                fullName: req.body.full_name,
                                emailAddress: req.body.email_address,
                                password: data.encryption.encrypt(req.body.password),
                                genres: req.body.genres_ids,
                                artist: req.body.artist_ids,
                                createDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                                isDeleted: 0,
                                lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                                profileLogo: req.body.profileLogo
                        }

                        let checkUser = await data.users.CheckUserExist(req.body.email_address);
                        if (checkUser == null) {
                                let AddUser = await data.users.CreateUser(userData);
                                // res.json(AddUser)
                                res.render("main_page/login", { layout: "main" });
                        } else {
                                res.status(404).render("main_page/signUpPage", { layout: "main", error_message: "Email Address already exist." });
                        }
                }
        } catch (e) {
                res.status(404).render("main_page/signUpPage", { layout: "main", "error_message": e.message });
        }
});

router.post("/login", async (req, res) => {
        try {
                var userData = await data.users.CheckUserExist(req.body.email_address);
                if (userData == null) {
                        res.status(404).render("main_page/login", { layout: "main", error_message: "Incorrect Username/password." });
                } else {
                        let password = data.encryption.decrypt(userData.password);
                        if (password == req.body.password) {

                                req.session.auth = jwt.sign({ userid: userData._id }, 'secret');
                                req.session.user = userData
                                res.render("main_page/MainLayout", { layout: "main" });
                        } else {
                                res.status(404).render("main_page/login", { layout: "main", error_message: "Incorrect Username/password." });
                        }
                }
        } catch (e) {
                res.status(404).render("main_page/login", { layout: "main" });
        }
});     
      



module.exports = router;