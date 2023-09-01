import { Request, Response, NextFunction } from "express";

import Exception from "@/models/error";
import ServerResponse from "@/models/response";

const errorSender = (
  error: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return ServerResponse.error(res, error);
};

export default errorSender;
