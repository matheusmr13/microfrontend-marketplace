import express from "express";
import Microfrontend from "./model";
import { getGithubRepository } from "github/client";

const MicrofrontendController = express.Router();

MicrofrontendController.get("/:uuid", async (req, res) => {
  const microfrontend = await Microfrontend.findJsonWithVersions(
    req.params.uuid
  );
  if (!microfrontend) {
    res.status(404).send();
    return;
  }
  res.json(microfrontend);
});

MicrofrontendController.get("/", async (req, res) => {
  const [microfrontends] = await Microfrontend.query().run();
  res.json(microfrontends.map((microfrontend) => microfrontend.toJSON()));
});

MicrofrontendController.post("/", async (req, res) => {
  const micro = await Microfrontend.createMicrofrontend(req.body);
  res.json(micro.toJSON());
});

MicrofrontendController.post("/import", async (req, res) => {
  try {
    const { id } = res.locals.tokenAuth;
    const repository = await getGithubRepository(req.body.repositoryName);
    const application = await Microfrontend.createFromRepository(
      repository,
      req.body,
      id
    );
    res.json(application.toJSON());
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

MicrofrontendController.put("/:uuid", async (req, res) => {
  let [microfrontend] = await Microfrontend.find(req.params.uuid);
  if (!microfrontend) {
    res.status(404).send();
    return;
  }

  microfrontend = await microfrontend.update(req.body);
  res.json(microfrontend.toJSON());
});

export default MicrofrontendController;
