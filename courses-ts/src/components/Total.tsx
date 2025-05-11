interface TotalProps {
  exercises: number
};

const Total = (props: TotalProps) => {
  return (
    <p>
      Total number of exercises {props.exercises}
    </p>
  );
};

export default Total;