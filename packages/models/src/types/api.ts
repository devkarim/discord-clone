export type BaseResponse<T> = { success: true; data: T };

export type BaseResponseNoData = { success: true };

export type ErrorResponse = { success: false; message: string };

export type SocketResponse<T> = BaseResponse<T> | ErrorResponse;

export type SocketResponseNoData = BaseResponseNoData | ErrorResponse;
