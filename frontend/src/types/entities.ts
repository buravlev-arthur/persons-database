export interface NewPersonData {
  phone: string;
  firstname: string;
  lastname: string;
  surname: string;
  address: string;
  photo?: string;
  email?: string;
  vk: string;
  createdAt: number;
}

export interface FoundPersonData extends NewPersonData {
  id: number;
}

export interface NewComment {
  personId: number;
  text: string;
  createdAt: number;
}

export interface FoundComment extends NewComment {
  id: number;
}
