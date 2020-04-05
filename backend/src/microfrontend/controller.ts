import express from 'express';
import Microfrontend from './model/microfrontend';


const MicrofrontendController = express.Router();
// MicrofrontendController.get('/', async(req, res) => {
// 	const [microfrontends] = await Microfrontend.query().run();
// 	res.json(microfrontends.map(micro => micro.toJSON()));
// });

// MicrofrontendController.get('/:id', async(req, res) => {
// 	const [microfrontends] = await Microfrontend.query().run();
// 	res.json(microfrontends.map(micro => micro.toJSON()));
// });

MicrofrontendController.post('/', async(req, res) => {
	const micro = Microfrontend.create();
	console.info(micro);
	await micro.save();
	res.json(micro.toJSON());
});

export default MicrofrontendController;