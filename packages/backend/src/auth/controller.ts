import express from "express";
import { getGithubAccessToken, getGithubUserInfo } from "./client";
import User from "../user/user";

const AuthController = express.Router();

AuthController.post("/github", async (req, res) => {
  try {
    const { code } = req.query;
    const githubAuth = await getGithubAccessToken(code.toString());
    const userInfos = await getGithubUserInfo(githubAuth);
    let [user] = await User.query()
      .filter("login", "=", userInfos.login)
      .runOnce();

    if (!user) {
      user = await User.createUser({
        name: userInfos.name,
        login: userInfos.login,
        email: userInfos.email,
      });
    }

    res.json({
      ...user.toJSON(),
      github: githubAuth,
      api: user.getJWT(),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

export default AuthController;
