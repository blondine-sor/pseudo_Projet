require("dotenv").config();
const authenticate = require("./passport-config");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {
  createProfile,
  findProfilePerEmail,
  findProfilePerId,
} = require("../database/queries/user.queries");

const secret = process.env.JWT_SECRET;
console.log(secret);
const secretKey =
  "jgzCXRWiaysoiaqlmytMmqAlguMfag8XpR0kPWv2QBbZKZ5oq4rSwnWqpSSl8yxSPil5szewtVfzuG1PA";

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
        const token = jwt.sign({ profile: profile.email }, secret, {
          expiresIn: "1h",
        });
        const refreshToken = jwt.sign({ profile }, secretKey, {
          expiresIn: "1d",
        });
        console.log(token);
        response
          .cookie("refreshToken", refreshToken, {})
          .header("Authorization", token)
          .render("infos/conseil-list", { profile });
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
router.get("/protected", authenticate, (req, res) => {
  res.send("Welcome to the protected route");
});
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ profile: decoded.profile }, secretKey, {
      expiresIn: "1h",
    });

    res.header("Authorization", accessToken).send(decoded.profile);
  } catch (error) {
    return res.status(400).send("Invalid refresh token.");
  }
});

router.post("/inscription", nouvelleInscription);

router.post("/connexion", verifierConnexion);

module.exports = router;
