import { CreateToken } from "./CreateToken";
import { RefreshToken } from "./RefreshToken";

export function GenerateTokenAndRefresh(email: string, routes: string[]) {
  const token = CreateToken(email, routes);
  const refreshToken = RefreshToken(email);

  return { token, refreshToken };
}
