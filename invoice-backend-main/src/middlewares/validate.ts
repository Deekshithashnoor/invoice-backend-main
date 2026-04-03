import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format the errors into a simple, easy to understand list
        const readableErrors = error.errors.map(issue => {
          const field = issue.path.length > 0 ? `'${issue.path.join('.')}'` : 'Field';
          return `${field}: ${issue.message}`;
        });
        
        return res.status(400).json({
          status: 'error',
          message: 'Invalid request data provided. Please check the following fields.',
          errors: readableErrors,
        });
      }
      return next(error);
    }
  };
};
