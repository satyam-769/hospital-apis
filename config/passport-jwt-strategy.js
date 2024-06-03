import passport from 'passport';
import Jwt from 'passport-jwt';
import User from '../models/user.js';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
      // User is authenticated, attach user info to response
      res.locals.user = req.user;
  }
  next();
};

export default passport;