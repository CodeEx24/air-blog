export interface ErrorResponse {
  response?: {
    status: number;
  };
  data?: {
    success: boolean;
    message: string;
  };
}

export interface RootError {
  error: Error;
  meta: Meta;
}

export interface Error {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

export interface Meta {
  request: Request;
  response: Response;
}
