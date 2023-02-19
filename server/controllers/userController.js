const User = require("../models/User");
const Note = require("../models/Note");
 
const bcrypt = require("bcrypt");

// @desc Get all users
// @route Get/users
// @access Private

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length)
    return res.status(400).json({ message: "no users found" });
  return res.json(users);
};

// @desc create new user
// @route POST/users
// @access Private
const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;

  // ? confirm data;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password;
  const hashedPass = await bcrypt.hash(password, 10); // salt rounds up

  const userObj =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPass }
      : { username, password: hashedPass, roles };

  // create and store new user;
  const user = await User.create(userObj);
  if (user) {
    res.status(201).json({ Message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @desc update user
// @route PATCH/users
// @access Private
const updateUser = async (req, res) => {
  const { id, password, username, roles, active } = req.body;
  // confirm data;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await User.findById(id).exec();
  if (!user) return res.status(404).json({ message: "User not found." });

  // check for duplicate;
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Allow updates to the original user;

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate user name." });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
};

// @desc delete user
// @route DELETE/users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "User Id required." });

  const note = await Note.findOne({ userId: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }
  const user = await User.findById(id).exec();
  if (!user) return res.status(400).json({ message: "User not found" });

  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
