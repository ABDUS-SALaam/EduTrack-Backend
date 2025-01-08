import { Document } from 'mongoose';
export default interface IStudent extends Document {
  name: string;
}
