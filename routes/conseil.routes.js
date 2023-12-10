const router = require("express").Router();
const conseil = require("../database/consei.model");

const createConseil = (request, response) => {
  response.render("infos/conseil-form");
};
const newConseil = (request, response, next) => {
  console.log("Params", request.params);
  console.log("Queries", request.query);
  console.log("Body: ", request.body);
  response.end();
};
router.get("/", (request, response) => {
  conseil
    .find()
    .exec()
    .then((listConseils) => {
      response.render("infos/conseil-list", { conseil: listConseils });
    });
});

router.get("/new", createConseil);
router.post("/create", newConseil);
module.exports = router;
