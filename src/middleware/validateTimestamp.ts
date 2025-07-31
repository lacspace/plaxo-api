import { Request, Response, NextFunction } from 'express';

export const validateTimestamp = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = req.headers['x-timestamp'];
  if (!timestamp) {
    return res.status(400).json({ message: 'Timestamp missing' });
  }

  const requestTime = new Date(parseInt(timestamp as string));
  const currentTime = new Date();
  const diff = Math.abs(currentTime.getTime() - requestTime.getTime());

  // Acceptable time window: 5 minutes
  if (diff > 5 * 60 * 1000) {
    return res.status(408).json({ message: 'Request timestamp too old' });
  }

  next();
};
