import express from 'express';
import Application from './model';


const ApplicationController = express.Router();
ApplicationController.get('/', async(req, res) => {
	const [applications] = await Application.query().run();
	res.json(applications.map(application => application.toJSON()));
});

ApplicationController.get('/:uuid', async(req, res) => {
	const application = await Application.findJsonWithMicrofrontends(req.params.uuid);
	if (!application) {
		res.status(404).send();
		return;
	}
	res.json(application);
});

ApplicationController.get('/:uuid/meta', async(req, res) => {
	const [application] = await Application.find(req.params.uuid);
	if (!application) {
		res.status(404).send();
		return;
	}

	const meta = await application.getMeta();
	res.json(meta);
});

ApplicationController.put('/:uuid', async(req, res) => {
	let [application] = await Application.find(req.params.uuid);
	if (!application) {
		res.status(404).send();
		return;
	}

	application = await application.update(req.body);
	res.json(application.toJSON());
});

ApplicationController.post('/', async(req, res) => {
	const application = await Application.createApplication(req.body);
	res.json(application.toJSON());
});



export default ApplicationController;