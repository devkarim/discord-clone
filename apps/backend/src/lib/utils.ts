import { customAlphabet } from 'nanoid/async';

import { Exception, SocketResponse } from 'models';

export const generateCode = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyz',
  6
);

export const handleSocketError = <T>(
  tag: string,
  err: unknown,
  ack?: (res: SocketResponse<T>) => void
) => {
  console.log(`[${tag}]`, err);
  ack?.({ success: false, message: Exception.parseError(err) });
};
