import { Request, Response, NextFunction } from 'express';

import { Errors } from 'models';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw Errors.unauthenticated;
  next();
};

export default requireAuth;
