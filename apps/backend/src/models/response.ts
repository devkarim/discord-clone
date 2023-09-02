import { Response } from 'express';

import {
  Exception,
  BaseResponse,
  BaseResponseNoData,
  ErrorResponse,
} from 'models';

class ServerResponse {
  static success<T>(
    res: Response<BaseResponse<T> | BaseResponseNoData>,
    data?: T
  ) {
    return res.json({ success: true, data });
  }

  static error(res: Response<ErrorResponse>, error: Exception) {
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
}

export default ServerResponse;
