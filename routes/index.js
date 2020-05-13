/* TOP MUSIC
 * Routes
 * ~
 */

const auth = require("../auth");
<<<<<<< Updated upstream
const accessRoutes = require("./access");
const cookies = require("../cookies");
const uuid = require("uuid/v4");
=======
const data = require("../data");
const jwt = require('jsonwebtoken');
>>>>>>> Stashed changes

const accessRoutes = require("./access");
const privateRoutes = require("./private");
const threadRoutes = require("./threads");

module.exports = app => {
  app.use("/access", accessRoutes);
<<<<<<< Updated upstream

  app.use("/", async(req, res) => {
=======
  app.use("/private", privateRoutes);
  app.use("/thread", threadRoutes);


  app.get("/*.handlebars", async (req, res) => {
    let url = req.originalUrl;
    let page = url.substring(1, url.length - 11);
    res.render(page);
  });

  app.get("/", async (req, res) => {
    let user_id = "", getLikeData =[];
    if (req.session.auth) {
      user_id = await jwt.verify(req.session.auth, 'secret').userid;
    }
    let getThreadData = await data.threads.GetAllThreads();
    app.locals.sess = req.session;
    let thread_ids = getThreadData.map(x => x._id);
    let getsubThreadData = await data.threads.GetSubThread(thread_ids);
    if(user_id){
     getLikeData = await data.threads.getThreadLikeWise(thread_ids, user_id);
    }
    getThreadData.forEach(element => {
      getLikeData.forEach(lelement => {
        if (user_id && element._id == lelement.threadId && element.userId == user_id) {
          element["userlike"] = 1
        }
      });
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
        auth: (req.session.auth) ? req.session.auth : "",
        userID: user_id
      });

    } else {

      res.render('profile/homePage', {
        layout: "main",
        title: "Top Music",
        threadData: getThreadData,
        auth: (req.session.auth) ? req.session.auth : "",
        message: "Please login to join the discussion.",
        userID: user_id
      });
    }
  });

  app.post("/", async (req, res) => {
    let input = req.body.dropdown;
    let user_id = "", getLikeData =[];
    if (req.session.auth) {
      user_id = await jwt.verify(req.session.auth, 'secret').userid;
    }
    let sorted = await data.threads.sortThreads(input);
    app.locals.sess = req.session;
    let thread_ids = sorted.map(x => x._id);
    let getsubThreadData = await data.threads.GetSubThread(thread_ids);
    if(user_id){
      getLikeData = await data.threads.getThreadLikeWise(thread_ids, user_id);
     }
    sorted.forEach(element => {
      getLikeData.forEach(lelement => {
        if (user_id && element._id == lelement.threadId && element.userId == user_id) {
          element["userlike"] = 1
        }
      });
      element["subThread"] = [];
      getsubThreadData.forEach(selement => {
        if (element._id == selement.threadId) {
          element["subThread"].push(selement)
        }
      });
    });
>>>>>>> Stashed changes
    res.render('profile/homePage', {
     layout : "main",
     title : "Top Artist Website"
    });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Post not found" });
  });
//   app.get("/", cookies.pushCookie, (req, res) => {
//     res.render("layouts/main");
//   });

//   app.post("/login", (req, res) => {
//     const usn = req.body.username;
//     const pwdSent = req.body.password;
//     const pwdHash = auth.getPassword(usn);
//     if (pwdHash && auth.passwordsMatch(pwdSent, pwdHash)) {
//       const sessionId = uuid();
//       auth.setSession(usn, sessionId);
//       cookies.setCookie(res, sessionId);
//       res.redirect("/private");
//     } else res.render("layouts/main", { error: true });
//   });

//   app.get("/private", cookies.pullCookie, (req, res) => {
//     res.render("layouts/user", auth.getUserFromSession(cookies.getCookie(req)));
//   });

//   app.get("/logout", cookies.pullCookie, (req, res) => {
//     cookies.expireCookie(res);
//     res.render("layouts/link", { title: "Logged Out" });
//   });
};