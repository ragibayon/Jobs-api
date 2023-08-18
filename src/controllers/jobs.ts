import {Request, Response, NextFunction} from 'express';
import Job from '../models/Job';
import {StatusCodes} from 'http-status-codes';
import {BadRequestError, NotFoundError} from '../errors';

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobs = await Job.find({createdBy: req.user!.userId}).sort('createdAt');
  res.status(StatusCodes.OK).json({jobs, count: jobs.length});
};
export const getJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobId = req.params.id;
  const job = await Job.findOne({_id: jobId, createdBy: req.user!.userId});
  if (!job) {
    throw new NotFoundError(`No Job found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {company, position} = req.body;
  if (!company || !position) {
    throw new BadRequestError('Please provide company and position');
  }
  const newJob = {
    company,
    position,
    createdBy: req.user!.userId,
  };

  const job = await Job.create(newJob);
  res.status(StatusCodes.CREATED).json({job});
};
export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobId = req.params.id;
  const {company, position} = req.body;
  if (company === '' || position == '') {
    throw new BadRequestError('Please provide valid company or position');
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: req.user!.userId,
    },
    {...req.body},
    {
      runValidators: true,
      new: true,
    }
  );

  if (!job) {
    throw new NotFoundError(`No Job found with id ${jobId}`);
  }

  res.status(StatusCodes.CREATED).json({job});
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobId = req.params.id;
  const userId = req.user!.userId;

  const job = await Job.findByIdAndRemove({_id: jobId, createdBy: userId});
  if (!job) {
    throw new NotFoundError(`No Job found with id ${jobId}`);
  }
  res.sendStatus(StatusCodes.NO_CONTENT);
};
