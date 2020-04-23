import express from 'express';
import Application from './model';
import { getGithubRepository, writeFileToGithubRepository } from './client';
import User from 'user/user';


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

ApplicationController.post('/import', async(req, res) => {
	try {
		const repository = await getGithubRepository(req.body.repositoryName);
		const application = await Application.createApplicationFromRepository(repository);
		res.json(application.toJSON());
	} catch(e){
		console.error(e);
		res.status(500).send(); 
	}
});

ApplicationController.put('/:uuid/publish', async(req, res) => {
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
			return
		};

		await writeFileToGithubRepository(user, application);

		res.json('ok');
	} catch(e){
		console.error(e);
		res.status(500).send(); 
	}
});



writeFileToGithubRepository

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