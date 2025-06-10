import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";
const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    baseUrl,
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    baseUrl,
    object
  );

  return data;
};

const getOne = async (id: string | undefined) => {
  const { data } = await axios.get<Patient>(
    `${baseUrl}/${id}`
  );

  return data;
};

const createEntry = async (id: string | undefined, object: EntryWithoutId) => {
  const { data } = await axios.post<Patient>(
    `${baseUrl}/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll, create, getOne, createEntry
};