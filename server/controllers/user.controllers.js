import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./error.controller";

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    let users = await User.find().select("name email created updated");
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};
const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};
const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export default { create, list, userById, read, update, remove };
