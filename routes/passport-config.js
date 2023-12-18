const jwt = require("jsonwebtoken");
const profile = require("./profile.routes");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!token && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.profile = decoded.profile;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({ profile: decoded.profile }, secretKey, {
        expiresIn: "1h",
      });

      res
        .cookie("refreshToken", refreshToken, {})
        .header("Authorization", token)
        .send(decoded.profile);
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};

module.exports = authenticate;

/* const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const profiles = require("./profile.routes");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const profile = profiles.find(
        (profile) => profile.email === jwt_payload.email
      );

      if (profile) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};*/
