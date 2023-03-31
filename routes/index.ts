import { Router } from "express";
import multer from "multer";
import { query, body } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { readQuery } from "../middlewares/readQuery";
import { createTimer } from "../controllers/createTimer";
import { getTimer} from "../controllers/getTimer";

import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

import path from "path";

// var storage = multer.diskStorage({
//   destination: function (req: Request, file, cb) {
//     cb(null, "public/uploads/css");
//   },
//   filename: function (req: Request, file, cb) {
//     cb(null, uuidv4() + path.extname(file.originalname));
//   },
// });
// var upload = multer({ storage: storage });

export const router = Router();
router.post("/createTimer", createTimer);

router.get(
  "/getTimer",
  [
    readQuery,
    query("timerId").exists().notEmpty(),
    query("year").exists().notEmpty(),
    query("month").exists().notEmpty(),
    query("day").exists().notEmpty(),
    query("hours").exists().notEmpty(),
    query("minutes").exists().notEmpty(),
    validateFields,
  ],
  getTimer
);

router.get("/ping", (req: Request, res: Response) => {
  res.send("Hello from timer v2");
});
