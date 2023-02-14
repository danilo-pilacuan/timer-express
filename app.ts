const express = require('express');
import { v4 as uuidv4 } from 'uuid';
const puppeteer = require('puppeteer');
const Handlebars = require('handlebars')  
const Path = require('path')  
const app = express();
const port = 3000;
const Fs = require('fs')  
const Util = require('util')  
const ReadFile = Util.promisify(Fs.readFile)

const bodyParser= require('body-parser')
const multer = require('multer');
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
  res.send("Hello from express");
})

// app.post("/createTimer",async (req,res)=>{
//   const timerId=uuidv4();

//   const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 110,
//         height: 120,
        
//     });      

//     const data = {
//       counter:"03",
//       message: 'Minutos',
//       plantilla:"plantilla.css"
//     }

//     const templatePath = Path.resolve('plantilla.html')
//     const content = await ReadFile(templatePath, 'utf8')

//     const template = Handlebars.compile(content)

//     const htmlHandleBars = template(data);
    
//     await page.setContent(htmlHandleBars)
//     const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'invoice.png'});

//   res.send(timerId);
// })


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/css')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4()+'.css')
  }
})
var upload = multer({ storage: storage })

app.post('/createTimer', upload.single('style'), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    
    res.send("401")
    
  }
  else
  {
    //res.send(req.file.filename)

    //const timerId=uuidv4();

  const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 110,
        height: 120,
        
    });      

    const templatePath = Path.resolve('plantilla.html')
    const content = await ReadFile(templatePath, 'utf8')

    const template = Handlebars.compile(content)

    

    for(var i=0;i<=59;i++)
    {
      const data = {
        counter:i.toString(),
        message: 'Minutos',
        plantilla:"uploads/css/"+req.file.filename
      }
  
      const htmlHandleBars = template(data);
      await page.setContent(htmlHandleBars)
      if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
        Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
      }
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/m"+i.toString()+".png"});

    }

    for(var i=0;i<=23;i++)
    {
      const data = {
        counter:(i<10?"0":"")+i.toString(),
        message: 'Horas',
        plantilla:"uploads/css/"+req.file.filename
      }
  
      const htmlHandleBars = template(data);
      await page.setContent(htmlHandleBars)
      if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
        Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
      }
      const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/h"+i.toString()+".png"});

    }

    for(var i=0;i<=59;i++)
    {
      const data = {
        counter:i.toString(),
        message: 'Segundos',
        plantilla:"uploads/css/"+req.file.filename
      }
  
      const htmlHandleBars = template(data);
      
      await page.setContent(htmlHandleBars)
      if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
        Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
      }
      const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/s"+i.toString()+".png"});

    }

    
    
    

  res.send(Path.parse(req.file.filename).name);

  }
    
 
})


app.use(express.static(Path.join(__dirname, '/public')));


app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});