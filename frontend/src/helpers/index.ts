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
  const regExp = new RegExp(/^[А-Я][а-я]+ [А-Я][а-я]+$/);
  return regExp.test(str);
};
