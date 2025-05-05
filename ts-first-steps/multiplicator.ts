type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation) : number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':

      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:

      throw new Error('Operation is not multiply, add or divide!');
  }
}

if (process.argv.length < 5) {
  console.log('Please provide two numbers and an operation (multiply, add, divide) as command line arguments.');
  process.exit(1);
}

const a = parseInt(process.argv[2]);
const b = parseInt(process.argv[3]);
const op = process.argv[4];

try {
  console.log(calculator(a, b, op as Operation));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}