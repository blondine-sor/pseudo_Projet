require("dotenv").config();

const router = require("express").Router();
const conseil = require("./conseil.routes");
const profile = require("./profile.routes");

router.use("/user", profile);
router.use("/conseil", conseil);

router.get("/", (request, response) => {
  response.redirect("/conseil");
});

module.exports = router;
