const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, cv) => {
    return acc + cv.exercises;
  }, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
