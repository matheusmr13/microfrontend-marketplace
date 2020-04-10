import express from 'express';
import Microfrontend from './model';


const MicrofrontendController = express.Router();

MicrofrontendController.get('/:uuid', async(req, res) => {
	const microfrontend = await Microfrontend.findJsonWithVersions(req.params.uuid);
	if (!microfrontend) {
		res.status(404).send();
		return;
	}
	res.json(microfrontend);
});

MicrofrontendController.post('/', async(req, res) => {
	const micro = await Microfrontend.createMicrofrontend(req.body);
	res.json(micro.toJSON());
});

MicrofrontendController.put('/:uuid', async(req, res) => {
	let [microfrontend] = await Microfrontend.find(req.params.uuid);
	if (!microfrontend) {
		res.status(404).send();
		return;
	}

	microfrontend = await microfrontend.update(req.body);
	res.json(microfrontend.toJSON());
});

export default MicrofrontendController;