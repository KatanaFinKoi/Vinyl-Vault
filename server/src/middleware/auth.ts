import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log('authHeader: ', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) =>{
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    });
  }
    else {
      console.error('No token provided');
      res.sendStatus(401);
    }

};
