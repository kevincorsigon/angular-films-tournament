export interface ReponseWrapper<T>{
    error: string;
    result: T;
    status: Number;
  }