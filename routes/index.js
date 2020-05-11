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
    let page = url.substring(1, url.length-11);
    res.render(page);
  });
  
  app.use("/", async(req, res) => {
    let getThreadData = await data.threads.GetAllThreads();
    app.locals.sess = req.session;

    if(getThreadData.length){
      res.render('profile/homePage', {
       layout : "main",
       title : "Top Music", 
       threadData : getThreadData,
       auth: (req.session.auth) ? req.session.auth : ""
      });

    }else{

      res.render('profile/homePage', {
       layout : "main",
       title : "Top Music", 
       threadData : getThreadData,
       auth: (req.session.auth) ? req.session.auth : "",
       message : "Recently One Post any Forum. Please Login to post our forum first!"
      });
    }
  });


};