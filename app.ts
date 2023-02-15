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

const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
  res.send("Hello from express");
})



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
        counter:(i<10?"0":"")+i.toString(),
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
        counter:(i<10?"0":"")+i.toString(),
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

    for(var i=0;i<=59;i++)
    {
      const data = {
        counter:(i<10?"0":"")+i.toString(),
        message: 'Días   ',
        plantilla:"uploads/css/"+req.file.filename
      }
  
      const htmlHandleBars = template(data);
      
      await page.setContent(htmlHandleBars)
      if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
        Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
      }
      const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/d"+i.toString()+".png"});

    }

    
    
    
    //res.writeHead(200, { 'Content-Type': 'text/json' });
    res.send({uuid:Path.parse(req.file.filename).name});

  }
    
 
})


app.get("/getTimer",async (req,res)=>{
  const nFrames=60;
  const year=req.query.year;
  const month=req.query.month;
  const day=req.query.day;
  const hours=req.query.hours;
  const minutes=req.query.minutes;
  
  const uuid=req.query.uuid;

  const baseW=110;
  const baseH=120;

  const encoder = new GIFEncoder(baseW*4, baseH,'neuquant',false);
  //encoder.createReadStream().pipe(fs.createWriteStream('testAnim.gif'));
  

  const canvas = createCanvas(baseW*4, baseH);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, baseW*4, baseH);

  if (Fs.existsSync('assets/'+uuid+"/"))
  {
    const dateEnd = new Date(year+"-"+month+"-"+day+"T"+hours+":"+minutes+":00");
    const dateNow = new Date(Date.now());

    var totalMiliSeconds=dateEnd.getTime()-dateNow.getTime();

    if(totalMiliSeconds<1000)
    {
      encoder.start();
      encoder.setRepeat(-1);   
      encoder.setDelay(1000);  
      encoder.setQuality(10); 
      const imageSFromPng = await loadImage('assets/'+uuid+"/s0.png");
      ctx.drawImage(imageSFromPng, baseW*3+1, 0, baseW, baseH);
      const imageMFromPng = await loadImage('assets/'+uuid+"/m0.png");
      ctx.drawImage(imageMFromPng, baseW*2+1, 0, baseW, baseH);
      const imageHFromPng = await loadImage('assets/'+uuid+"/h0.png");
      ctx.drawImage(imageHFromPng, baseW*1+1, 0, baseW, baseH);
      const imageDFromPng = await loadImage('assets/'+uuid+"/d0.png");
      ctx.drawImage(imageDFromPng, 0, 0, baseW, baseH);
      
      for(var i=0;i<3;i++)
      {
        encoder.addFrame(ctx);
      }


    }
    else
    {
      if(Math.floor(totalMiliSeconds/1000)<nFrames)
      {
        encoder.start();
        encoder.setRepeat(-1);   
        encoder.setDelay(1000);  
        encoder.setQuality(10); 
      }
      else
      {
        encoder.start();
        encoder.setRepeat(0);   
        encoder.setDelay(1000); 
        encoder.setQuality(10); 
      }
      var remainingDays=Math.floor((totalMiliSeconds)/(1000*3600*24))
      var remainingHours=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24)))/(1000*3600))
      var remainingMinutes=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24))-(remainingHours*(1000*3600)))/(1000*60))
      var remainingSeconds=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24))-(remainingHours*(1000*3600))-(remainingMinutes*(1000*60)))/(1000))

      for (var i = 150; i >= 0; i--) {
          remainingSeconds=remainingSeconds-1;
          if(remainingSeconds<0)
          {
            remainingSeconds=59
            remainingMinutes=remainingMinutes-1;
          }

          if(remainingMinutes<0)
          {
            remainingMinutes=59
            remainingHours=remainingHours-1;
          }

          if(remainingHours<0)
          {
            remainingHours=23
            remainingDays=remainingDays-1;
          }
          //const start = Date.now();

          
        
          const imageSFromPng = await loadImage('assets/'+uuid+"/s"+(remainingSeconds<=0?0:remainingSeconds)+'.png');
          ctx.drawImage(imageSFromPng, baseW*3+1, 0, baseW, baseH);
          const imageMFromPng = await loadImage('assets/'+uuid+"/m"+(remainingMinutes<=0?0:remainingMinutes)+'.png');
          ctx.drawImage(imageMFromPng, baseW*2+1, 0, baseW, baseH);
          const imageHFromPng = await loadImage('assets/'+uuid+"/h"+(remainingHours<=0?0:remainingHours)+'.png');
          ctx.drawImage(imageHFromPng, baseW*1+1, 0, baseW, baseH);
          const imageDFromPng = await loadImage('assets/'+uuid+"/d"+(remainingDays<=0?0:remainingDays)+'.png');
          ctx.drawImage(imageDFromPng, 0, 0, baseW, baseH);
          encoder.addFrame(ctx);
          if(remainingDays==0 && remainingHours==0 && remainingMinutes==0 && remainingSeconds==0)
          {
            
            break;
          }
      }   

      
    

    }


    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(encoder.out.getData(), 'binary');
  }

})


app.use(express.static(Path.join(__dirname, '/public')));


app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});