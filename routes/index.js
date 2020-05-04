/* TOP MUSIC
 * Users
 * ~
 */

const auth = require("../auth");
const cookies = require("../cookies");
const uuid = require("uuid/v4");

module.exports = app => {
  app.get("/", cookies.pushCookie, (req, res) => {
    res.render("layouts/home");
  });

  app.post("/login", (req, res) => {
    const usn = req.body.username;
    const pwdSent = req.body.password;
    const pwdHash = auth.getPassword(usn);
    if (pwdHash && auth.passwordsMatch(pwdSent, pwdHash)) {
      const sessionId = uuid();
      auth.setSession(usn, sessionId);
      cookies.setCookie(res, sessionId);
      res.redirect("/private");
    } else res.render("layouts/home", { error: true });
  });

  app.get("/private", cookies.pullCookie, (req, res) => {
    res.render("layouts/user", auth.getUserFromSession(cookies.getCookie(req)));
  });

  app.get("/logout", cookies.pullCookie, (req, res) => {
    cookies.expireCookie(res);
    res.render("layouts/link", { title: "Logged Out" });
  });
};