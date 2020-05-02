import express from 'express';
import Application from './model';
import { v4 as uuidv4 } from 'uuid';
import {
  getGithubRepository,
  writeFileToGithubRepository,
  getBranch,
  getTree,
  getFoldersFromGithub,
  downloadTree,
  uploadTree,
} from '../github/client';
import User from 'user/user';
import Microfrontend from 'microfrontend/model';
import Version from 'version/model';
import PackageAll from 'external/package-folder';
import getTreeFromFolder from 'external/list-folder';

const ApplicationController = express.Router();
ApplicationController.get('/', async (req, res) => {
  const [applications] = await Application.query().run();
  res.json(applications.map((application) => application.toJSON()));
});

ApplicationController.get('/:uuid', async (req, res) => {
  const application = await Application.findJsonWithMicrofrontends(req.params.uuid);
  if (!application) {
    res.status(404).send();
    return;
  }
  res.json(application);
});

ApplicationController.post('/import', async (req, res) => {
  try {
    const { id } = res.locals.tokenAuth;
    const repository = await getGithubRepository(req.body.repositoryName);
    const application = await Application.createFromRepository(repository, req.body, id);
    res.json(application.toJSON());
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

ApplicationController.post('/clear', async (req, res) => {
  const [applications] = await Application.query().run();
  await Promise.all(
    applications.map(async (application) => {
      await application.delete();
    })
  );
  res.json({});
});

ApplicationController.post('/:uuid/deploy', async (req, res) => {
  try {
    const [application] = await Application.find(req.params.uuid);
    if (!application) {
      res.status(404).send();
      return;
    }
    const { id } = res.locals.tokenAuth;
    const [user] = await User.find(id);
    if (!user) {
      res.status(500).send();
      return;
    }

    const microVersion = req.body;

    console.info(microVersion);
    const a = await Promise.all(
      Object.entries(microVersion).map(async ([microfrontendId, versionId]) => {
        if (typeof versionId !== 'string') return;

        const [microfrontend] = await Microfrontend.find(microfrontendId);
        const [version] = await Version.find(versionId);
        return {
          microfrontend,
          version,
        };
      })
    );

    const randomUuid = uuidv4();

    const dest = `/tmp/${randomUuid}`;

    await Promise.all(
      a.map(async (m) => {
        if (!m) return;
        const { microfrontend, version } = m;

        if (!microfrontend || !version) return;

        const tree = await getTree(microfrontend.githubId, version.sha, user);
        console.info(tree);

        await downloadTree(`${dest}/builds/${microfrontend.packageName}`, tree, user);
      })
    );

    await PackageAll({ rootFolder: dest });

    const tree = await getTreeFromFolder(`${dest}/build`);
    await uploadTree(application.githubId, tree, user, 'my versiion');

    res.json('ok');
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

ApplicationController.put('/:uuid', async (req, res) => {
  let [application] = await Application.find(req.params.uuid);
  if (!application) {
    res.status(404).send();
    return;
  }

  application = await application.update(req.body);
  res.json(application.toJSON());
});

export default ApplicationController;
