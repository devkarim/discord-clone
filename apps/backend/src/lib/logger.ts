namespace Logger {
  type LoggerTag = "info" | "warn" | "error" | "exception";

  const log = (
    message: any,
    title: string = "app",
    tag: LoggerTag = "info"
  ) => {
    const tags = {
      info: "\x1b[32m[INFO]\x1b[0m",
      warn: "\x1b[33m[WARN]\x1b[0m",
      error: "\x1b[31m[ERROR]\x1b[0m",
      exception: "\x1b[31m[EXCEPTION]\x1b[0m",
    };
    if (tag == "exception")
      return console.error(
        `${tags[tag]} [${title.toUpperCase()}] ${
          typeof message == "object" ? message?.stack : message
        }`
      );
    console.log(
      `${tags[tag]} [${title.toUpperCase()}] ${
        typeof message == "object" ? JSON.stringify(message, null, 2) : message
      }`
    );
  };

  export const info = (title: string, ...message: any[]) => {
    log(
      message
        .map((m) => (typeof m == "object" ? JSON.stringify(m, null, 2) : m))
        .join(" "),
      title,
      "info"
    );
  };

  export const warn = (message: any, title?: string) => {
    log(message, title, "warn");
  };

  export const error = (message: any, title?: string) => {
    log(message, title, "error");
  };

  export const exception = (err: unknown, title?: string) => {
    log(err, title, "exception");
  };
}

export default Logger;
