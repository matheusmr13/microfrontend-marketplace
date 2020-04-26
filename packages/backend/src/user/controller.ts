import express from "express";
import User from "./user";

const UserController = express.Router();

UserController.get("/", async (req, res) => {
  const [users] = await User.query().run();
  res.json(users.map((user) => user.toJSON()));
});

UserController.get("/me", async (req, res) => {
  const { id } = res.locals.tokenAuth;
  const [user] = await User.find(id);

  if (!user) {
    res.status(500).send();
    return;
  }

  res.json(user.toJSON());
});

UserController.put("/me", async (req, res) => {
  const { id } = res.locals.tokenAuth;
  const [user] = await User.find(id);

  if (!user) {
    res.status(500).send();
    return;
  }

  await user.update(req.body);
  res.json(user.toJSON());
});

export default UserController;
