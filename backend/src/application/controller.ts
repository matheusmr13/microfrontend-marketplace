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

ApplicationController.get('/:uuid/microfrontends', async(req, res) => {
	const [application] = await Application.find(req.params.uuid);
	if (!application) {
		res.status(404).send();
		return;
	}
	res.json(application.toJSON());
});

ApplicationController.post('/', async(req, res) => {
	console.info(req.body)
	const application = await Application.createApplication(req.body);
	res.json(application.toJSON());
});

export default ApplicationController;