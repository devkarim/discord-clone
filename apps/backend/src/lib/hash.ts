import bcrypt from "bcrypt";

export const hash = (text: string) => {
  return bcrypt.hash(text, 10);
};

export const comparePasswords = (text: string, hashed: string) => {
  return bcrypt.compare(text, hashed);
};
