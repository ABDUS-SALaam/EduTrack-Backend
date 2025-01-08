import { Document } from 'mongoose';
export interface IUser extends Document {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  accessToken: string | null;
  refreshToken: string | null;
  avatar: string | null;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateRefreshToken(): string;
  generateAccessToken(): string;
}
