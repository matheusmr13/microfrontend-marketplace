import express from 'express';
import Version from './model';

const VersionController = express.Router();

VersionController.get('/:uuid', async (req, res) => {
  const [version] = await Version.find(req.params.uuid);
  if (!version) {
    res.status(404).send();
    return;
  }
  res.json(version);
});

VersionController.get('/', async (req, res) => {
  const microfrontendId = req.query.microfrontendId.toString();

  const query = Version.query();
  if (microfrontendId) query.filter('microfrontendId', '=', microfrontendId);

  const [version] = await query.run();
  if (!version) {
    res.status(404).send();
    return;
  }
  res.json(version);
});

VersionController.post('/', async (req, res) => {
  const micro = await Version.createVersion(req.body);
  res.json(micro.toJSON());
});

VersionController.put('/:uuid', async (req, res) => {
  let [version] = await Version.find(req.params.uuid);
  if (!version) {
    res.status(404).send();
    return;
  }

  version = await version.update(req.body);
  res.json(version.toJSON());
});

VersionController.put('/:uuid/approve', async (req, res) => {
  let [version] = await Version.find(req.params.uuid);
  if (!version) {
    res.status(404).send();
    return;
  }

  version = await version.approve();
  res.json(version.toJSON());
});

VersionController.post('/clear', async (req, res) => {
  const [versions] = await Version.query().run();
  await Promise.all(
    versions.map(async (version) => {
      await version.delete();
    })
  );
  res.json({});
});

export default VersionController;
