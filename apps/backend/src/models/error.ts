import { ZodError } from "zod";
import { AxiosError } from "axios";

class Exception extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }

  static manual(message: string, statusCode: number) {
    return new Exception(message, statusCode);
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
    return this.fromError(new Error("Internal server error"));
  }

  static fromError(err: Error, statusCode: number = 500) {
    return new Exception(err.message, statusCode);
  }

  static fromZod(err: ZodError, statusCode: number = 400) {
    const message = err.errors[0].message;
    return new Exception(message, statusCode);
  }

  static fromAxios(err: AxiosError, statusCode?: number) {
    return new Exception(
      "Internal server error",
      statusCode || err.response?.status || 500
    );
  }
}

export default Exception;
