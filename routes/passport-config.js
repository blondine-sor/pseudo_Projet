const JwtStrategy = require("passport-jwt").Strategy;
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
};
