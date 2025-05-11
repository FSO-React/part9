interface CourseDetail {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courseParts: CourseDetail[]
};

const Content = (props: ContentProps) => {
  const { courseParts } = props;
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;