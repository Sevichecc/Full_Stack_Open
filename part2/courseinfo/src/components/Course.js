const Header = ({ name }) => {
  return <h1>{name}</h1>;
};
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <strong>
      <p>
        Total of {parts.reduce((s, p) => (s = s + p.exercises), 0)} exercises
      </p>
    </strong>
  );
};

export default Course;
