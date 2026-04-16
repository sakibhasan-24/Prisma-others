import type { NextFunction, Request,Response } from "express";

import { sendResponse } from "../utills/response";
import type { ZodType } from "zod";


export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return sendResponse({
        res,
        statusCode: 400,
        success: false,
        message: "Validation failed",
        data: result.error.format(),
      });
    }

    // send validate data to next middleware
    req.body = result.data;

    next();
  };