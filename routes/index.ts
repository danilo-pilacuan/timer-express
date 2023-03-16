import { Router } from "express";
import multer from "multer";
import { query, body } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { readQuery } from "../middlewares/readQuery";
import { createTimerCanvas } from "../controllers/createTimerCanvas";
import { getTimerCanvas } from "../controllers/getTimerCanvas";
import { getTimerNoDays } from "../controllers/getTimerNoDays";

import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

import path from "path";

var storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "public/uploads/css");
  },
  filename: function (req: Request, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });

var multipleUpload = upload.fields([{name:"plantilla",maxCount:1},{name:"estilos",maxCount:1},{name:"background",maxCount:1}]);


export const router = Router();
router.post("/createTimerCanvas", upload.single("style"), createTimerCanvas);

router.post("/uploadMultiple",multipleUpload,(req:Request,res:Response)=>{
    if(req.files)
    {
      console.log("Files uploaded");
      console.log(req.files);
      console.log("-----")
      console.log(req.body)
      console.log(req.body.hasBack)
      res.json({ok:"ok"})
    }
});

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
    validateFields,
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
    validateFields,
  ],
  getTimerNoDays
);

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello from router");
});
