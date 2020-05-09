/* TOP MUSIC
 * Routes
 * ~
 */

const auth = require("../auth");
const accessRoutes = require("./access");
const cookies = require("../cookies");
const uuid = require("uuid/v4");

module.exports = app => {
  app.use("/access", accessRoutes);

  app.use("/", async(req, res) => {
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