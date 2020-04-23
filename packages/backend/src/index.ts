import express from 'express';
import MicrofrontendController from './microfrontend/controller';
import ApplicationController from './application/controller';
import VersionController from './version/controller';
import AuthController from './auth/controller';
import UserController from './user/controller';
import cors from 'cors';
import AuthFilter from './auth/filter';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/oauth', AuthController)
app.use(AuthFilter);
app.use('/microfrontends', MicrofrontendController);
app.use('/applications', ApplicationController);
app.use('/versions', VersionController);
app.use('/users', UserController);
app.use((err: Error, req: any, res : any, next: any) => {
  console.info('chegou aqueeee')
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const { PORT = 8080 } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});