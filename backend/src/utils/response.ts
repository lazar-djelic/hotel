import { errorLogger } from "./errorLogger.ts";

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  UNAUTHORIZED: { code: 401, status: "UNAUTHORIZED" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export interface ResponseType<T> {
  timeStamp: string;
  statusCode: number;
  httpStatus: string;
  response: T;
}

class Response<T> {
  timeStamp: string;
  statusCode: number;
  httpStatus: string;
  response: T;

  constructor(statusCode: number, httpStatus: string, response: T) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.response = response;
  }
}

export const response = {
  OK: <T>(responseData: T): ResponseType<T> => {
    return new Response(HttpStatus.OK.code, HttpStatus.OK.status, responseData);
  },

  CREATED: <T>(responseData: T): ResponseType<T> =>
    new Response(
      HttpStatus.CREATED.code,
      HttpStatus.CREATED.status,
      responseData
    ),

  NOT_FOUND: <T>(responseData: T): ResponseType<T> =>
    new Response(
      HttpStatus.NOT_FOUND.code,
      HttpStatus.NOT_FOUND.status,
      responseData
    ),

  UNAUTHORIZED: <T>(responseData: T): ResponseType<T> =>
    new Response(
      HttpStatus.UNAUTHORIZED.code,
      HttpStatus.UNAUTHORIZED.status,
      responseData
    ),

  BAD_REQUEST: <T>(responseData: T): ResponseType<T> =>
    new Response(
      HttpStatus.BAD_REQUEST.code,
      HttpStatus.BAD_REQUEST.status,
      responseData
    ),

  INTERNAL_SERVER_ERROR: <T>(responseData: T): ResponseType<T> => {
    errorLogger(responseData);

    return new Response(
      HttpStatus.INTERNAL_SERVER_ERROR.code,
      HttpStatus.INTERNAL_SERVER_ERROR.status,
      responseData
    );
  },
};

export default response;
