import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

/** Save a token to session storage */
export const saveToken = (key: string, token: string): void => {
  if (!token) throw new Error("Token is required");
  sessionStorage.setItem(key, token);
};

/** Extend the standard JWT payload with your expected fields */
export interface CustomJwtPayload extends JwtPayload {
  Name: string; // optional in case the backend doesn’t always send it
  Role: string;
  email: string;
}

/** Retrieve and decode a token safely */
export const getDecodedToken = (
  key: string
): { token: string; user: CustomJwtPayload } | null => {
  const tokenData = sessionStorage.getItem(key);
  if (!tokenData) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(tokenData);

    // Defensive checks to ensure required props exist
    const user: CustomJwtPayload = {
      ...decoded,
      Name: decoded.Name ?? "",
      Role: decoded.Role ?? "",
      email: decoded.email ?? "",
    };

    return { token: tokenData, user };
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
};
