import { Request, Response, NextFunction } from 'express';

import { Logger } from 'utils';
import Exception from '@/models/error';

const errorLogger = (
  error: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.exception(error);
  next(error);
};

export default errorLogger;
