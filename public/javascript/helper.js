const Handlebars = require("handlebars");
Handlebars.registerHelper('ifCond', function(op, options) {
    if(op != "") {
        return options.fn(this)
    }else{
      return options.inverse(this)
    }
  });