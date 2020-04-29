var accessRoutes = require("./access");

const constructorMethod = app => {
  app.use("/access", accessRoutes);


  app.use("/", async(req, res) => {
   console.log("inside")
    res.render('./main_page/signUpPage', {
     layout : "main",
     //title : "Top Artist Website"
    });
  });

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Post not found" });
  });
};

module.exports = constructorMethod;