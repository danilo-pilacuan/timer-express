import { Request, Response } from "express";
import Fs from 'fs';  
import Util from 'util';  
import GIFEncoder from 'gifencoder';
import * as Canvas from 'canvas'
const ReadFile = Util.promisify(Fs.readFile);


export const getTimerCanvas = async (req: Request, res: Response) => {

const nFrames=120;
  const year=req.query.year;
  const month=req.query.month;
  const day=req.query.day;
  const hours=req.query.hours;
  const minutes=req.query.minutes;
  
  const uuid=req.query.uuid;

  const baseW=110;
  const baseH=120;

  const encoder = new GIFEncoder(baseW*4, baseH);


  const canvas = Canvas.createCanvas(baseW*4, baseH);
  const ctx : any = canvas.getContext('2d');

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
      const imageSFromPng = await Canvas.loadImage('assets/'+uuid+"/s0.png");
      ctx.drawImage(imageSFromPng, baseW*3+1, 0, baseW, baseH);
      const imageMFromPng = await Canvas.loadImage('assets/'+uuid+"/m0.png");
      ctx.drawImage(imageMFromPng, baseW*2+1, 0, baseW, baseH);
      const imageHFromPng = await Canvas.loadImage('assets/'+uuid+"/h0.png");
      ctx.drawImage(imageHFromPng, baseW*1+1, 0, baseW, baseH);
      const imageDFromPng = await Canvas.loadImage('assets/'+uuid+"/d0.png");
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
        
          const imageSFromPng = await Canvas.loadImage('assets/'+uuid+"/s"+(remainingSeconds<=0?0:remainingSeconds)+'.png');
          ctx.drawImage(imageSFromPng, baseW*3+1, 0, baseW, baseH);
          const imageMFromPng = await Canvas.loadImage('assets/'+uuid+"/m"+(remainingMinutes<=0?0:remainingMinutes)+'.png');
          ctx.drawImage(imageMFromPng, baseW*2+1, 0, baseW, baseH);
          const imageHFromPng = await Canvas.loadImage('assets/'+uuid+"/h"+(remainingHours<=0?0:remainingHours)+'.png');
          ctx.drawImage(imageHFromPng, baseW*1+1, 0, baseW, baseH);
          const imageDFromPng = await Canvas.loadImage('assets/'+uuid+"/d"+(remainingDays<=0?0:remainingDays)+'.png');
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

};
