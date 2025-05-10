import express from 'express';
import cors from 'cors';

import pingRouter from './routes/ping.route';
import diagnosesRouter from './routes/diagnoses.route';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const PORT = 3001;

router.use((req, _res, next) => {
  console.log('Request URL:', req.url);
  next();
});


app.use('/api', router);
app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});