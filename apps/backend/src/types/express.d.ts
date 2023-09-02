declare namespace Express {
  export interface User {
    id: number;
    username: string;
    name: string | null;
    email: string;
  }
}
