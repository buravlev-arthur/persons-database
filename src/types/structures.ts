export interface PersonOldStructure {
  id: number;
  phone: string;
  name: string;
  lastname: string;
  ltname: string;
  adress: string;
  order_file: string;
  photo: string;
  email: string;
  vk_link: string;
  add_date: string;
}

export interface RequestPersonData {
  phone: string;
  firstname: string;
  lastname: string;
  surname: string;
  address: string;
  photo: string;
  email: string;
  vk: string;
  createdAt: number;
}

export interface PersonTableRow extends RequestPersonData {
  id: number;
}

export type PersonTableRows = Array<PersonTableRow>;

export interface Person extends PersonTableRow {
  comments: Comments;
}

export type Persons = Array<Person>;

interface Comment {
  date: number;
  message: string;
}

export interface RequestCommentData {
  personId: number;
  text: string;
  createdAt: number;
}

export interface CommentTableRow extends RequestCommentData {
  id: number;
}

export type CommentTableRows = Array<CommentTableRow>;

export type Comments = Array<Comment>;
