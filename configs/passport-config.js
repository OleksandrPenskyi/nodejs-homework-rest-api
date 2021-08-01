const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const { userService } = require("../service");

const setting = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(setting, async (payload, done) => {
  try {
    const user = await userService.getUserById(payload.id);
    if (!user) {
      throw new Error("Not authorized");
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
