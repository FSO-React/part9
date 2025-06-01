import type { DiaryEntry } from "../types";
import DiaryDetail from "./DiaryDetail";

interface DiaryListProps {
  diaries: Array<DiaryEntry>
}

const DiaryList = (props: DiaryListProps) => {
  const { diaries } = props;
  return (
    <div>
      {diaries.map((diary) => (
        <DiaryDetail key={diary.id} entry={diary} />
      ))}
    </div>
  )
};

export default DiaryList;