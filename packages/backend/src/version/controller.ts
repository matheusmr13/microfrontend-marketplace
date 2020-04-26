import express from 'express';
import Version from './model';


const VersionController = express.Router();

VersionController.get('/:uuid', async(req, res) => {
	const [version] = await Version.find(req.params.uuid);
	if (!version) {
		res.status(404).send();
		return;
	}
	res.json(version);
});

VersionController.post('/', async(req, res) => {
	const micro = await Version.createVersion(req.body);
	res.json(micro.toJSON());
});

VersionController.put('/:uuid', async(req, res) => {
	let [version] = await Version.find(req.params.uuid);
	if (!version) {
		res.status(404).send();
		return;
	}

	version = await version.update(req.body);
	res.json(version.toJSON());
});

VersionController.put('/:uuid/approve', async(req, res) => {
	let [version] = await Version.find(req.params.uuid);
	if (!version) {
		res.status(404).send();
		return;
	}

	version = await version.approve();
	res.json(version.toJSON());
});


export default VersionController;