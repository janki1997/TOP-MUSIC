/* TOP MUSIC
 * Routes
 * ~
 */

const auth = require("../auth");
const accessRoutes = require("./access");
const data = require("../data");
const threads = require("./threads");
const cookies = require("../cookies");
const uuid = require("uuid/v4");
const jwt = require('jsonwebtoken');

module.exports = app => {
  app.use("/access", accessRoutes);
  app.use("/thread", threads);


  app.get("/*.handlebars", async (req, res) => {
    let url = req.originalUrl;
    let page = url.substring(1, url.length - 11);
    res.render(page);
  });

  app.get("/", async (req, res) => {
    let getThreadData = await data.threads.GetAllThreads();
    app.locals.sess = req.session;
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
        auth: (req.session.auth) ? req.session.auth : ""
      });

    } else {

      res.render('profile/homePage', {
        layout: "main",
        title: "Top Music",
        threadData: getThreadData,
        auth: (req.session.auth) ? req.session.auth : "",
        message: "Recently One Post any Forum. Please Login to post our forum first!"
      });
    }
  });

  app.post("/", async (req, res) => {
    let input = req.body.dropdown;
    let sorted = await data.threads.sortThreads(input);
    app.locals.sess = req.session;
    let thread_ids = sorted.map(x => x._id);
    let getsubThreadData = await data.threads.GetSubThread(thread_ids);
    sorted.forEach(element => {
      element["subThread"] = [];
      getsubThreadData.forEach(selement => {
          if (element._id == selement.threadId) {
              element["subThread"].push(selement)
          }
      });
    });
    res.render('profile/homePage', {
      layout: "main",
      title: "Top Music",
      threadData: sorted,
      auth: (req.session.auth) ? req.session.auth : ""
    });
  });

  app.use('*', (req, res) => {
		res.sendStatus(404);
	});

};