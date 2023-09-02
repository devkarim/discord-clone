import { Request, Response, NextFunction } from 'express';

import { Exception } from 'models';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(Exception.from(error));
};

export default errorHandler;
