interface ExerciseInput {
  days: number[];
  target: number;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = ({ days, target }: ExerciseInput): ExerciseResult => {
  if (days.length === 0) {
    throw new Error('Days must be a non-empty array of numbers');
  }
  if (target <= 0) {
    throw new Error('Target must be a positive number');
  }

  
  const periodLength = days.length;
  const trainingDays = days.filter(day => day > 0).length;
  const average = days.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating: number = 0;
  let ratingDescription: string = '';

  switch (true) {
    case (average <= (target - 0.1)):
      rating = 1;
      ratingDescription = 'bad, far from target';
      break;
    case (average >= (target - 0.1) || average < target):
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    case (average >= target):
      rating = 3; 
      ratingDescription = 'good, target reached';
      break; 
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

// Example usage
const days: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const target: number = 2;
console.log(calculateExercise({ days, target }));