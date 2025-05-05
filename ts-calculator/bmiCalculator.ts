const calculateBmi = (height: number, weight: number): string => {
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
      category = 'Underweight (Severe thinness)	';
      break;
    case bmi <= 16.9:
      category = 'Underweight (Moderate thinness)	';
      break;
    case bmi <= 18.4:
      category = 'Underweight (Mild thinness)	';
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
  return `Your BMI is ${bmi} and you are ${category}`;
}

if (process.argv.length < 4 || process.argv.length > 4) {
  console.log('Please provide height and weight as command line arguments');
  process.exit(1);
} 

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));