import { Router } from "express";
import multer from 'multer';
import { query, body } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { readQuery } from "../middlewares/readQuery";
import { createTimerCanvas } from "../controllers/createTimerCanvas";
import { getTimerCanvas } from "../controllers/getTimerCanvas";
import { getTimerNoDays } from "../controllers/getTimerNoDays";

import { v4 as uuidv4 } from 'uuid';
import { Request,Response } from 'express';

var storage = multer.diskStorage({
    destination: function (req:Request, file, cb) {
      cb(null, 'public/uploads/css')
    },
    filename: function (req:Request, file, cb) {
      cb(null, uuidv4()+'.css')
    }
  })
  var upload = multer({ storage: storage })

export const router = Router();

router.post(
  "/createTimerCanvas",
  upload.single('style'),
  createTimerCanvas
);


// router.post(
//   "/createTimerCanvas",
//   [body("style").exists().notEmpty(), validateFields],
//   upload.single('style'),
//   createTimerCanvas
// );

router.get(
    "/getTimerCanvas",
    [
        readQuery,
        query("timerId").exists().notEmpty(),
        query("year").exists().notEmpty(),
        query("month").exists().notEmpty(),
        query("day").exists().notEmpty(),  
        query("hours").exists().notEmpty(),  
        query("minutes").exists().notEmpty(),  
        validateFields
    ],
    getTimerCanvas
);

router.get(
  "/getTimerNoDays",
  [
      readQuery,
      query("timerId").exists().notEmpty(),
      query("year").exists().notEmpty(),
      query("month").exists().notEmpty(),
      query("day").exists().notEmpty(),  
      query("hours").exists().notEmpty(),  
      query("minutes").exists().notEmpty(),  
      validateFields
  ],
  getTimerNoDays
);



router.get("/hello",(req:Request,res:Response)=>{
    res.send("Hello from router");
  })