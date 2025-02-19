import { Request, Response, NextFunction } from 'express';
class Helper {
  constructor() {}
  public asyncHandler =
    (
      requestHandler: (
        req: Request,
        res: Response,
        nextFn: NextFunction
      ) => Promise<unknown>
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
}
export default Helper;
