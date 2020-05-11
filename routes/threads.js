/* TOP MUSIC
 * Threads
 * ~
 */
const express = require('express');
const router = express.Router();
const data = require('../data');
const uuid = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

router.post("/createNewThread", async (req, res) => {
    try {
        if (!req.body.title) {
            res.render("threads/myThread", { layout: "main", error_message: "Please provide forum title." })
        } else if (!req.body.user_id) {
            res.render("threads/myThread", { layout: "main", error_message: "Please provide user information." })
        } else {
            let threadData = {
                _id: uuid.v4(),
                title: req.body.title,
                comment: (req.body.comment) ? req.body.comment : "",
                media: (req.body.media) ? req.body.media : "",
                createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                userId: req.body.user_id,
                likeCount: 0,
                parentComment: 0
            }
            let insertThread = await data.threads.AddThread(threadData);
            let getThreadData = await data.threads.GetAllUserThreads(req.body.user_id);
            res.render("threads/myThread", { layout: "main", threadData: getThreadData, auth : req.session.auth, userID : req.body.user_id })
        }
    } catch (e) {
        res.render("threads/myThread", { layout: "main", error_message: "Something went wrong. Please try again!" })
    }
});

router.post("/likeDislikeThread/:thread_id/:user_id", async (req, res) => {
    try {
        if (!req.body.user_id) {
            res.render("threads/myThread", { layout: "main", error_message: "Please provide user information." })
        } else {
            let threadData = await getThreadByLike(req.params.thread_id, req.params.user_id);
            if (threadData == null) {
                let ThreadData = {
                    threadId: req.params.thread_id,
                    userId: req.params.user_id,
                    _id: uuid.v4()
                }
                let addLike = await addThreadLike(ThreadData);
                res.json({ likeCount: 1 })
            } else {
                let removeLike = await removeThreadLike(req.params.thread_id, req.params.user_id)
                res.render("threads/myThread", { layout: "main", like: 0 });
            }
        }
    } catch (e) {
        res.render("threads/myThread", { layout: "main", error_message: "Something went wrong. Please try again!" })
    }
});

router.post("/UpdateThread/:thread_id", async (req, res) => {
    try {
        if (!req.body.title) {
            res.render("threads/myThread", { layout: "main", error_message: "Please provide forum title." })
        } else if (!req.body.user_id) {
            res.render("threads/myThread", { layout: "main", error_message: "Please provide user information." })
        } else {
            let threadData = {
                title: req.body.title,
                comment: (req.body.comment) ? req.body.comment : "",
                media: (req.body.media) ? req.body.media : "",
                lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            }
            let updateThread = await data.threads.UpdateThread(threadData, thread_id);
            let getThreadData = await data.threads.GetAllUserThreads(req.body.user_id);
            res.render("threads/myThread", { layout: "main", threadData: getThreadData })
        }
    } catch (e) {
        res.render("threads/myThread", { layout: "main", error_message: "Something went wrong. Please try again!" })
    }
});

router.get("/DeleteThread/:thread_id/:user_id", async (req, res) => {
    try {
        let deleteThread = await data.threads.DeleteThread(req.params.thread_id);
        let getThreadData = await data.threads.GetAllUserThreads(req.params.user_id);
        res.render("threads/myThread", { layout: "main", threadData: getThreadData, auth : req.session.auth, userID : req.params.user_id })

    } catch (e) {
        res.render("threads/myThread", { layout: "main", error_message: "Something went wrong. Please try again!" })
    }
});

router.get("/UserThread", async (req, res) => {
    try {
        let user_id = await jwt.verify(req.session.auth, 'secret').userid;
        let getThreadData = await data.threads.GetAllUserThreads(user_id);
        let user_data = await data.users.GetUserById(user_id);
        getThreadData.forEach(element=>{
            element["fullName"] = user_data.fullName;
            element["profileLogo"] = user_data.profileLogo;
        })
        res.render("threads/myThread", { layout: "main", threadData: getThreadData, auth : req.session.auth, userID : user_id });
    } catch (e) {
       res.status(401).json({"msg" : e.message})
    }
});
module.exports = router;
