import { sign } from "jsonwebtoken";

export function RefreshToken(email: string): string {
  const token = sign({}, "a220c5ef6d83e1afc774b4691f6fad27", {
    subject: email,
    expiresIn: 60 * 60,
  });

  return token;
}
