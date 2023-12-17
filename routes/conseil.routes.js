const router = require("express").Router();
const conseil = require("../database/model/consei.model");

router.get("/", (request, response) => {
  conseil
    .find()
    .exec()
    .then((listConseils) => {
      response.render("infos/conseil-list", { conseils: listConseils });
    });
});
const createConseil = (request, response) => {
  response.render("infos/conseil-form");
};
const newConseil = (request, response, next) => {
  const body = request.body;
  const newAdvice = new conseil(body);
  newAdvice
    .save()
    .then((register) => {
      response.redirect("/");
    })
    .catch((err) => {
      let errors = [];
      const errorsKeys = Object.keys(err.errors);
      errorsKeys.forEach((key) => {
        errors.push(err.errors[key].message);
      });
      response.render("infos/conseil-form", { errors });
    });
};

router.get("/new", createConseil);
router.post("/create", newConseil);
module.exports = router;
