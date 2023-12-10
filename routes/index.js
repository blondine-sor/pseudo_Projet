const router = require("express").Router();
const conseil = require("./conseil.routes");

router.use("/conseil", conseil);

router.get("/", (request, response) => {
  response.redirect("/conseil");
});

module.exports = router;
