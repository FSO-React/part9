interface ExerciseValues {
  target: number;
  days: number[];
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

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments: atleast 2 arguments are required (1 for target and 1 or more for days)');

  let target: number;
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error('Target provided value wasn\'t not a number!');
  }

  let days: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      days.push(Number(args[i]));
    } else {
      throw new Error('Days provided values were not numbers!');
    }
  }

  return {
    target,
    days
  }
}

const calculateExercises = ({ days, target }: ExerciseValues): ExerciseResult => {
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
    case (average >= (target - 0.1) && average < target):
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

try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(`Your target is ${target} and your days are ${days}`);
  const exerciseDiagnosis = calculateExercises({ target, days });
  console.log(`Your exercise diagnosis result is: \n`, exerciseDiagnosis);
} catch (error: unknown) {
  let errorMessage: string = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += `\nError: ${error.message}`;
  }
  console.log(errorMessage);
}