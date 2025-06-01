import Part from "./Part"
import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[]
};

const Content = (props: ContentProps) => {
  const { courseParts } = props;
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} coursePart={part}></Part>
      ))}
    </div>
  );
};

export default Content;