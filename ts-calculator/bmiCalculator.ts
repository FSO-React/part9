interface CorporalValues {
  height: number;
  weight: number;
}

interface BmiResult {
  bmi: number;
  category: string;
}

const parseBmiArguments = (args: string[]): CorporalValues => {
  if (args.length < 4) throw new Error('Not enough arguments: atleast 2 arguments are required (1 for height and 1 for weight)');
  if (args.length > 4) throw new Error('Too many arguments: only 2 arguments are required (1 for height and 1 for weight)');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): BmiResult => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive numbers!');
  }
  
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category: string = 'Unknown category';
  switch (true) {
    case bmi < 16:
      category = 'Underweight (Severe thinness)';
      break;
    case bmi <= 16.9:
      category = 'Underweight (Moderate thinness)';
      break;
    case bmi <= 18.4:
      category = 'Underweight (Mild thinness)';
      break;
    case bmi <= 24.9:
      category = 'Normal range';
      break;
    case bmi <= 29.9:
      category = 'Overweight (Pre-obese)';
      break;
    case bmi <= 34.9:
      category = 'Obese (Class I)';
      break;
    case bmi <= 39.9:
      category = 'Obese (Class II)';
      break;
    case bmi >= 40:
      category = 'Obese (Class III)';
      break;
  }
  return {
    bmi,
    category
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    const { bmi, category } = calculateBmi(height, weight);
    console.log(`Your BMI is ${bmi} and your category is '${category}'`);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += `\nError: ${error.message}`;
    }
    console.log(errorMessage);
  }
}
