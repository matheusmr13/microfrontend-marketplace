import express from 'express';
import MicrofrontendController from './microfrontend/controller';
import ApplicationController from './application/controller';

const app = express();
app.use(express.json());
app.use('/microfrontends', MicrofrontendController);
app.use('/applications', ApplicationController);
app.use((err: Error, req: any, res : any, next: any) => {
  console.info('chegou aqueeee')
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const { PORT = 8080 } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});