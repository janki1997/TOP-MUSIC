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
    var likeThreadData = {}, thread_ids = [];
    let getThreadData = await data.threads.GetAllThreads();
    // thread_ids = getThreadData.map(x=> x.threadID)
    // if(req.session.auth){
    //   user_id = await jwt.verify(req.session.auth, 'secret');
    //   likeThreadData = await data.threads.getThreadLikeWise(thread_ids, user_id)
    // }
    app.locals.sess = req.session;
    let user_id = ""
    res.render('profile/homePage', {
     layout : "main",
     title : "Top Music", 
     threadData : getThreadData,
     auth: (req.session.auth) ? req.session.auth : ""
    });
  });


};