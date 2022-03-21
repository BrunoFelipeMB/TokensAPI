import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export type DecodedToken = {
  sub: string;
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const decoded = verify(
      token as string,
      "a220c5ef6d83e1afc774b4691f6fad27"
    ) as DecodedToken;

    request.user = decoded.sub;
    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: true, code: "token.expired", message: "Token invalid." });
  }
}
