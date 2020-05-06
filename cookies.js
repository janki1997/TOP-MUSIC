/* TOP MUSIC
 * Cookies
 * ~
 */

const auth = require("./auth");
const cookieName = "AuthCookie";

const expireCookie = res => {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  res.cookie(cookieName, "Expired", { expires: oneHourAgo });
  res.clearCookie(cookieName);
};

const getCookie = req => {
  return req.cookies[cookieName];
};

const pushCookie = (req, res, next) => {
  const cookie = req.cookies[cookieName];
  if (cookie && auth.validSession(cookie)) res.redirect("/private");
  else next();
};

const pullCookie = (req, res, next) => {
  const cookie = req.cookies[cookieName];
  if (cookie) {
    if (auth.validSession(cookie)) next();
    else {
      expireCookie(res);
      res.status(403).render("layouts/link", { title: "Private" });
    }
  } else res.status(403).render("layouts/link", { title: "Private" });
};

const setCookie = (res, sessionId) => {
  res.cookie(cookieName, sessionId);
};

module.exports = {
  expireCookie: expireCookie,
  getCookie: getCookie,
  pushCookie: pushCookie,
  pullCookie: pullCookie,
  setCookie: setCookie
};