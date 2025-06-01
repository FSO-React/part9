import { useState, type SyntheticEvent } from "react";
import { addDiary } from "../services/diariesService";
import type { DiaryEntry } from "../types";
import axios from "axios";

interface DiaryFormProps {
  diaries: DiaryEntry[]
  setDiaries: (diaries: DiaryEntry[]) => void
  setError: (error: string[]) => void
}

const DiaryForm = (props: DiaryFormProps) => {
  const { diaries, setDiaries, setError } = props;
  
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const visibilityOptions = ['great', 'good', 'ok', 'poor'];
  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'];

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const savedEntry = await addDiary({ date, visibility, weather, comment });
      console.log('llega aca?');
      setDiaries(diaries.concat(savedEntry));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      console.log('no llegaaa', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = Array.isArray(error.response?.data?.error)
          ? error.response.data.error
              .map((e: { message: string; path?: string[] }) =>
                e.path && e.path.length > 0
                  ? `${e.path.join('.')}: ${e.message}`
                  : e.message
              )
          : ['Ocurrió un error inesperado.'];
        console.log(errorMessage);
        setError(errorMessage);
        setTimeout(() => {
          setError(['']);
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        visibility: {
          visibilityOptions.map((option) => (
            <label key={option}>
              <input type="radio" value={option} checked={visibility === option} onChange={(e) => setVisibility(e.target.value)} />
              {option}
            </label>
          ))
        }
      </div>
      <div>
        weather: {
          weatherOptions.map((option) => (
            <label key={option}>
              <input type="radio" value={option} checked={visibility === option} onChange={(e) => setVisibility(e.target.value)} />
              {option}
            </label>
          ))
        }
      </div>
      <div>
        comment: <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  )
};

export default DiaryForm;