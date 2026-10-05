import type { Request, Response, NextFunction } from "express";

class DateNow {
  toString() {
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    return formatted_date;
  }
}

var num = 0;

const apiLogger = (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  //     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const method = req.method;
  const url = req.url;

  console.log(`${++num}. Method: ${method} ${url}`);
  // console.log(`Original url: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  console.log(`Time: ${new DateNow().toString()}`);
  next();
};

export default apiLogger;
