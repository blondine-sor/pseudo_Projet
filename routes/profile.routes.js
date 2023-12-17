const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createProfile,
  findProfilePerEmail,
  findProfilePerId,
} = require("../database/queries/user.queries");

const nouvelleInscription = async (request, response, next) => {
  const body = request.body;
  try {
    const profile = await createProfile(body);
    response.redirect("/user/connexion");
  } catch (e) {
    response.render("users/inscription", {
      errors: [e.message],
    });
  }
};

const verifierConnexion = async (request, response, next) => {
  const body = request.body;
  try {
    const profile = await findProfilePerEmail(body.email);
    if (profile) {
      const match = await profile.comparePassword(body.password);
      if (match) {
        const token = jwt.sign(
          { profile: profile.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);
        response.render("infos/conseil-list", { profile });
      } else {
        response.render("users/connexion", {
          errors: ["Password doesn't match!"],
        });
      }
    } else {
      response.render("users/connexion", {
        errors: ["User not found !"],
      });
    }
  } catch (e) {
    next(e);
  }
};

router.get("/connexion", (request, response) => {
  response.render("users/connexion");
});

router.get("/inscription", (request, response) => {
  response.render("users/inscription");
});

router.post("/inscription", nouvelleInscription);

router.post("/connexion", verifierConnexion);

module.exports = router;
