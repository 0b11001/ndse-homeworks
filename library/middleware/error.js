const res = require("express/lib/response");

module.exports = (req, res) => {
  res.render("error/404", {
    title: "404 | Not found",
    page: "error",
  });
};
