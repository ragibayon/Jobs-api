import {Document} from 'mongoose';

export interface IJob extends Document {
  company: string;
  position: string;
  status: 'interview' | 'declined' | 'pending';
}
