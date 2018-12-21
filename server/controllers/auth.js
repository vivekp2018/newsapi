import User from "../models/user";
import passport from "passport";
import {
  userToJSON,
  getUserToken,
  encryptPassword,
  isPasswordAllowed
} from "../utils/auth";

const authUserJson = user => ({
  ...userToJSON(user),
  token: getUserToken(user)
});
async function register(req, res) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(422).json({ errors: { username: `can't be blank` } });
  }
  if (!password) {
    return res.status(422).json({ errors: { password: `can't be blank` } });
  }

  if (!isPasswordAllowed(password)) {
    return res.status(422).json({
      errors: {
        password: ` must be greater than 6 character.Must contain special
      character and letter`
      }
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(422).json({ errors: { username: "taken" } });
  }
  const encPassword = await encryptPassword(password);

  const newUser = await User.create({
    username,
    password: encPassword
  });

  return res.json({ user: authUserJson(newUser) });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(422).json({ errors: { username: `can't be blank` } });
  }
  if (!password) {
    return res.status(422).json({ errors: { password: `can't be blank` } });
  }

  const { user, info } = await authenticate(req, res, next);
  if (user) {
    return res.json({ user: authUserJson(user) });
  } else {
    return res.status(422).json(info);
  }
}
function authenticate(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        reject(err);
      } else {
        resolve({ user, info });
      }
    })(req, res, next);
  });
}
async function me(req, res) {}

export { me, login, register };
