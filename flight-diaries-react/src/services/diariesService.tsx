import axios from 'axios';
import type { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};
