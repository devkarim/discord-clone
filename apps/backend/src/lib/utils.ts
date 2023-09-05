import { customAlphabet } from 'nanoid/async';

export const generateCode = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyz',
  6
);
