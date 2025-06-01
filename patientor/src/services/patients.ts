import axios from "axios";
import { Patient, PatientFormValues } from "../types";

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

export default {
  getAll, create, getOne
};