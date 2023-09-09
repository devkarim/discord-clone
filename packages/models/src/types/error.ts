import { ZodError } from 'zod';
import { AxiosError } from 'axios';
import { ErrorResponse } from './api';

export class Exception extends Error {
  name = 'Exception';

  constructor(
    public message: string,
    public statusCode: number
  ) {
    super(message);
  }

  static manual(message: string, statusCode: number) {
    return new Exception(message, statusCode);
  }

  static parseError(err: unknown) {
    return Exception.from(err).message;
  }

  static from(err: unknown) {
    if (err instanceof Exception) return err;
    if (err instanceof ZodError) {
      return this.fromZod(err);
    }
    if (err instanceof AxiosError) {
      return this.fromAxios(err);
    }
    if (err instanceof Error) {
      return this.fromError(err);
    }
    return this.fromError(new Error('Internal server error'));
  }

  static fromError(err: Error, statusCode: number = 500) {
    if (err.name == 'AxiosError') {
      return this.fromAxios(err as AxiosError);
    } else if (err.name == 'ZodError') {
      return this.fromZod(err as ZodError);
    } else if (err.name == 'Exception') {
      return err as Exception;
    }
    return new Exception(err.message, statusCode);
  }

  static fromZod(err: ZodError, statusCode: number = 400) {
    const message = err.errors[0].message;
    return new Exception(message, statusCode);
  }

  static fromAxios(err: AxiosError, statusCode?: number) {
    return new Exception(
      (err.response?.data as ErrorResponse)?.message || 'Internal server error',
      statusCode || err.response?.status || 500
    );
  }
}
