const router = require("express").Router();
const conseil = require("./conseil.routes");
const profile = require("./profile.routes");

const passport = require("passport");
require("./passport-config")(passport);

router.use("/user", profile);
router.use("/conseil", conseil);
router.use(passport.initialize());

router.get("/", (request, response) => {
  response.redirect("/conseil");
});

module.exports = router;
