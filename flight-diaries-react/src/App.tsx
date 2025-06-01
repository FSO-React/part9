// import Header from "./components/Header";
// import Content from "./components/Content";
// import Total from "./components/Total";
// import type { CoursePart } from "./types";
import type { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAll } from "./services/diariesService";

import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState(['']);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await getAll();
      setDiaries(diaries);
    }
    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Add new entry</h1>
      {error && 
        error.map((e: string) => (
          <p key={e} style={{ color: 'red' }}>
            {e}
          </p>
        ))
      }
      <DiaryForm diaries={diaries} setDiaries={setDiaries} setError={setError} />
      <h1>Diary entries</h1>
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;