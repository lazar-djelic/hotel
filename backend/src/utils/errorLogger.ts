import fs from "fs";

export const errorLogger = (...args: any) => {
  const filePath = "error.log";
  const message = args.join(" ");
  fs.appendFileSync(filePath, message + "\n");
};
