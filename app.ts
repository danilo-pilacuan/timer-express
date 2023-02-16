import express from 'express';
import bodyParser from 'body-parser';
import { Request,Response } from 'express';
import Path from 'path';  
import { router } from "./routes";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use("/timer/v2", router);



app.use(express.static(Path.join(__dirname, '/public')));


app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});