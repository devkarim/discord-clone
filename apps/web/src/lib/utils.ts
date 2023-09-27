import moment from 'moment';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

import { Logger } from 'utils';
import { Exception } from 'models';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomHexColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const formatDate = (date: Date): string => {
  const isToday = moment(date).isSame(new Date(), 'day');
  const isYesterday = moment(date).isSame(
    new Date().setDate(new Date().getDate() - 1),
    'day'
  );
  return isToday
    ? 'Today at ' + moment(date).format('hh:mm A')
    : isYesterday
    ? 'Yesterday at ' + moment(date).format('hh:mm A')
    : moment(date).format('DD/MM/YYYY hh:mm A');
};

export const handleError = (err: unknown) => {
  Logger.exception(err);
  toast.error(Exception.parseError(err));
};
