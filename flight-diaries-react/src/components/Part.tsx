import type { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const { coursePart } = props;
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <div>
            <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
        </p>
      );
  
    case "group":
      return (
        <p>
          <div>
            <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          </div>
          <div>
            <em>project exercises {coursePart.groupProjectCount}</em>
          </div>
        </p>
      );

    case "background":
      return (
        <p>
          <div>
            <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>
            submit to {coursePart.backgroundMaterial}
          </div>
        </p>
      );

    case "special":
      return (
        <p>
          <div>
            <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>
            required skills: {coursePart.requirements.join(", ")}
          </div>
        </p>
      );

    default:
      return (
        <></>
      );
  }
};

export default Part;
