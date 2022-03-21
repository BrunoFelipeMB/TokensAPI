import { NextFunction, Request, Response } from "express";
import { validate, version } from "uuid";
import { AppError } from "../errors/AppError";

function uuidValidateV4(uuid: string) {
  return validate(uuid) && version(uuid) === 4;
}

export async function ensureUUID(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request.params;

  if (uuidValidateV4(user_id)) {
    next();
  } else {
    throw new AppError("Invalid UUID", 401);
  }
}
