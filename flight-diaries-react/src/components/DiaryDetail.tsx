import type { DiaryEntry } from "../types";

interface DiaryEntryProps {
  entry: DiaryEntry
}

const DiaryDetail = (props: DiaryEntryProps) => {
  const { entry } = props;
  return (
    <>
      <h4>{entry.date}</h4>
      <div>{entry.comment}</div>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </>
  )
};

export default DiaryDetail;