import express from 'express';
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const PORT = 3001;

router.use((req, _res, next) => {
  console.log('Request URL:', req.url);
  next();
});

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});