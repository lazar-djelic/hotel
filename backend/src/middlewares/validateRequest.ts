import { z, ZodError } from "zod";
import responseUtil from "../utils/response.ts";
import type { Request, Response, NextFunction } from "express";

export const validateRequest = <Params = {}, Query = {}, Body = {}>(schemas: {
  body?: z.ZodSchema<Body>;
  query?: z.ZodSchema<Query>;
  params?: z.ZodSchema<Params>;
}) => {
  return (
    req: Request<Params, any, Body, Query>,
    res: Response,
    next: NextFunction
  ) => {
    function errorMessages(error: ZodError, type: "body" | "query" | "params") {
      const errorMsgs = error.issues.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));

      return `Request ${type} validation error: ${JSON.stringify(errorMsgs)}`;
    }

    try {
      schemas.body?.parse(req.body);
    } catch (error: any) {
      const response = responseUtil.BAD_REQUEST(errorMessages(error, "body"));
      return res.status(response.statusCode).send(response);
    }

    try {
      schemas.query?.parse(req.query);
    } catch (error: any) {
      const response = responseUtil.BAD_REQUEST(errorMessages(error, "query"));
      return res.status(response.statusCode).send(response);
    }

    try {
      schemas.params?.parse(req.params);
    } catch (error: any) {
      const response = responseUtil.BAD_REQUEST(errorMessages(error, "params"));
      return res.status(response.statusCode).send(response);
    }

    next();
  };
};
