import Exception from "@/models/error";
import Messages from "./messages";

const Errors = {
  invalidCredentials: Exception.manual(Messages.errors.invalidCredentials, 400),
  emailTaken: Exception.manual(Messages.errors.emailTaken, 400),
  unauthenticated: Exception.manual(Messages.errors.unauthenticated, 401),
  unauthorized: Exception.manual(Messages.errors.unauthorized, 403),
} as const;

export default Errors;
