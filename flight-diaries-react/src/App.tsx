// import Header from "./components/Header";
// import Content from "./components/Content";
// import Total from "./components/Total";
// import type { CoursePart } from "./types";
import type { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAll } from "./services/diariesService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await getAll();
      setDiaries(diaries);
      console.log(diaries);
    }
    fetchDiaries();
  }, []);

  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h1>{diary.date}</h1>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
      {/* <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total exercises={totalExercises} /> */}
    </div>
  );
};

export default App;