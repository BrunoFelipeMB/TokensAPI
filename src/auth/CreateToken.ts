import { sign } from "jsonwebtoken";

export function CreateToken(email: string, routes: string[]): string {
  const token = sign(
    { routes, admin: routes[0] === "admin" },
    "a220c5ef6d83e1afc774b4691f6fad27",
    {
      subject: email,
      expiresIn: 60 * 15,
    }
  );

  return token;
}
