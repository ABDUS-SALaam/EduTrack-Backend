import { Document } from 'mongoose';
export interface IUser extends Document {
  role: string; // The user's role (e.g., admin, teacher)
  firstName: string;
  lastName: string;
  email: string; // Unique email for the user
  phoneNumber: number;
  password: string; // Hashed password
  accessToken: string | null; // JWT access token
  refreshToken: string | null; // JWT refresh token
  avatar: string | null; // URL or path to the user's avatar

  /**
   * Checks if the provided password matches the hashed password.
   * @param password - The plain-text password to compare.
   * @returns A promise that resolves to `true` if passwords match, `false` otherwise.
   */
  isPasswordCorrect(password: string): Promise<boolean>;

  /**
   * Generates a new JWT refresh token.
   * @returns A string containing the generated refresh token.
   */
  generateRefreshToken(): Promise<string>;

  /**
   * Generates a new JWT access token.
   * @returns A string containing the generated access token.
   */
  generateAccessToken(): Promise<string>;
}
