export type TUsername = {
  username: string;
};

export type TEmail = {
  email: string;
};

export type TLogin = {
  user: TUsername | TEmail;
  password: string;
};
