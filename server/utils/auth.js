import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import expressJWT from "express-jwt";
import LocalStrategy from "passport-local";
import User from "../models/user";
import { omit } from "lodash";
const twoHours = 60 * 60 * 24;
const requireTime = Date.now();

const now = () =>
  process.env.NODE_ENV === "production" ? Date.now() : requireTime;
const issuedAt = Math.floor(now() / 1000);

const authMiddleware = {
  required: expressJWT({
    secret: config.secret
  }),
  optional: expressJWT({
    secret: config.secret,
    credentialsRequired: false
  })
};

async function encryptPassword(plainText) {
  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(plainText, salt);
  return encPassword;
}

async function comparePassword(plainPassword, encryptedPassword) {
  try {
    const result = await bcrypt.compare(plainPassword, encryptedPassword);
    return result;
  } catch (error) {
    return false;
  }
}
function isPasswordAllowed(password) {
  return password.length > 6 && /\d/.test(password) && /\D/.test(password);
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    let user;

    try {
      user = await User.findOne({ username }).lean();
    } catch (error) {
      return done(error);
    }

    if (!user || (await comparePassword(password, user.password)) === false) {
      return done(null, false, {
        errors: { "username or password": "is invalid" }
      });
    }

    return done(null, userToJSON(user));
  });
}

function getUserToken({ _id, username }) {
  const issuedAt = Math.floor(now());
  return jwt.sign(
    {
      id: _id,
      username,
      iat: issuedAt,
      exp: issuedAt + twoHours
    },
    config.secret
  );
}
function userToJSON(user) {
  return omit(user, ["createdAt", "password", "__v", "isActive"]);
}
export {
  authMiddleware,
  getUserToken,
  getLocalStrategy,
  isPasswordAllowed,
  encryptPassword,
  comparePassword,
  userToJSON
};
