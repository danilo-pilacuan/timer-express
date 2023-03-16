import { NextFunction, Request, Response } from "express";

export const readQuery = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req;

  const set = url.split(/[=?&]/) as any[];
  set.shift();
  const properties = {} as Record<string, string>;
  set.forEach((e, index) => {
    if (index % 2 === 0) {
      properties[e] = set[index + 1];
    }
  });
  req.query = properties;
  next();
};
