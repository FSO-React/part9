import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  console.log(height, weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'wrong type of parameters' });
  }
  if (height <= 0 || weight <= 0) {
    res.status(400).send({ error: 'height and weight must be positive numbers' });
  }
  
  const calculatedBmi = calculateBmi(height, weight);
  res.status(200).send({
    weight,
    height,
    bmi: calculatedBmi.bmi,
    category: calculatedBmi.category
  });
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target;
  console.log(daily_exercises, target);
  
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (typeof target !== 'number' || target <= 0 || daily_exercises.some(isNaN) || !Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  
  const exerciseDiagnosis = calculateExercises({ days: daily_exercises, target });
  res.status(200).send({
    ...exerciseDiagnosis,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});