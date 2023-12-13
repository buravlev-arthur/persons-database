import type { RequestPersonData, RequestCommentData } from '../types/structures.js';
import toSendEmail from './sendmail.js';

export const isValidURL = (str: string): boolean => {
  try {
    const correctHost = 'vk.com';
    const url = new URL(str);
    return url.host === correctHost;
  } catch {
    return false;
  }
};

export const isValidPhone = (str: string): boolean => {
  const regExp = new RegExp(/^\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d$/);
  return regExp.test(str);
};

export const isValidName = (str: string): boolean => {
  const regExp = new RegExp(/^[А-Я][а-я]+(-[А-Я][а-я]+)*$/);
  return regExp.test(str);
};

export const isValidSurName = (str: string): boolean => {
  const regExp = new RegExp(/^[А-Я][а-я]+$/);
  return regExp.test(str);
};

export const isValidPersonData = (person: RequestPersonData): boolean => {
  if (!person.phone?.length && !person.vk?.length) {
    return false;
  }
  if (person.firstname?.length && !isValidName(person.firstname)) {
    return false;
  }
  if (person.lastname?.length && !isValidName(person.lastname)) {
    return false;
  }
  if (person.surname?.length && !isValidSurName(person.surname)) {
    return false;
  }
  if (person.phone?.length === 0 && person.vk.length === 0) {
    return false;
  }
  if (person.phone?.length && !isValidPhone(person.phone)) {
    return false;
  }
  if (person.vk?.length && !isValidURL(person.vk)) {
    return false;
  }
  if (!person.createdAt || isNaN(person.createdAt)) {
    return false;
  }
  return true;
};

export const isValidCommentData = (comment: RequestCommentData): boolean => {
  if (!comment.personId || isNaN(comment.personId)) {
    return false;
  }
  if (!comment.text?.length) {
    return false;
  }
  if (!comment.createdAt || isNaN(comment.createdAt)) {
    return false;
  }
  return true;
};

export { toSendEmail };
