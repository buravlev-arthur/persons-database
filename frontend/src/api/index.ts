import axios from 'axios';
import { baseURL } from 'src/consts/apiCredits';
import type { AxiosError } from 'axios';
import type {
  FoundPersonData,
  FoundComment,
  NewComment,
  NewPersonData,
} from 'src/types/entities';

export const getPersonByPhone = async (
  phone: string
): Promise<FoundPersonData | AxiosError> => {
  try {
    const result = await axios.get(`${baseURL}/persons/phone/${phone}`);
    return result.data[0];
  } catch (error) {
    throw error;
  }
};

export const getPersonByVK = async (
  vkLink: string
): Promise<FoundPersonData | AxiosError> => {
  try {
    const result = await axios.get(
      `${baseURL}/persons/vk/${encodeURIComponent(vkLink)}`
    );
    return result.data[0];
  } catch (error) {
    throw error;
  }
};

export const getPersonByName = async (
  name: string
): Promise<FoundPersonData | AxiosError> => {
  try {
    const firstname = name.split(' ')[1];
    const lastname = name.split(' ')[0];
    const result = await axios.get(
      `${baseURL}/persons/firstname/${firstname}/lastname/${lastname}`
    );
    return result.data[0];
  } catch (error) {
    throw error;
  }
};

export const getCommentsByPersonId = async (
  id: number
): Promise<FoundComment[] | AxiosError> => {
  try {
    const result = await axios.get(`${baseURL}/comments/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (
  commentData: NewComment
): Promise<FoundComment | AxiosError> => {
  try {
    const result = await axios.post(`${baseURL}/comments/add`, commentData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const addPerson = async (
  personData: NewPersonData
): Promise<FoundPersonData | AxiosError> => {
  try {
    const result = await axios.post(`${baseURL}/persons/add`, personData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getCountOfPersons = async (): Promise<number | AxiosError> => {
  try {
    const result = await axios.get(`${baseURL}/persons/count`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (
  text: string
): Promise<{ ok: boolean } | AxiosError> => {
  try {
    const result = await axios.post(`${baseURL}/send-feedback`, { text });
    return result.data;
  } catch (error) {
    throw error;
  }
};
