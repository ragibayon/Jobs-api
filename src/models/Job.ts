import {model, Schema, Types} from 'mongoose';
import {IJob} from '../interfaces/IJob';

const jobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide an user'],
    },
  },
  {timestamps: true}
);

const Job = model('Job', jobSchema);
export default Job;
