import { Request, Response } from "express";
import Fs from 'fs';  
import Util from 'util';  
import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import * as Canvas from 'canvas'
const ReadFile = Util.promisify(Fs.readFile);


export const getTimerNoDays = async (req: Request, res: Response) => {

  const nFrames=60;
  const timerId=req.query.timerId;
  const year=req.query.year;
  const month=req.query.month;
  const day=req.query.day;
  const hours=req.query.hours;
  const minutes=req.query.minutes;
  const darkmode=parseInt(req.query.darkmode.toString());
  const nodays=parseInt(req.query.nodays.toString());

  const baseW=120;
  const baseH=120;

  const imgPadding=60;
  const paddingLeft=imgPadding/2

  var totalWidth=baseW*4+imgPadding;
  var totalHeight=baseH;

  if(nodays==1)
  {
    totalWidth=baseW*3+imgPadding;
  }

  

  const encoder = GIFEncoder();

  

  const canvas = Canvas.createCanvas(totalWidth, baseH);
  const ctx : any = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, totalWidth, baseH);
  
  var positionCounter=0;

  if (Fs.existsSync('assets/'+timerId+"/"))
  {
    const dateEnd = new Date(year+"-"+month+"-"+day+"T"+hours+":"+minutes+":00");
    const dateNow = new Date(Date.now());

    var totalMiliSeconds=dateEnd.getTime()-dateNow.getTime();
    
    const imageForPalette = await Canvas.loadImage('assets/'+timerId+"/s59"+(darkmode==1?"_dark":"")+'.png');
    ctx.drawImage(imageForPalette, 0, 0, totalWidth, totalHeight);
    const imageDataForPalette=ctx.getImageData(0,0,totalWidth,totalHeight).data;
    
    //const palette=quantize(imageDataForPalette,256,{format:"rgba4444",oneBitAlpha:true});
    const palette=quantize(imageDataForPalette,256,{format:"rgba4444",oneBitAlpha:false,clearAlpha:true,clearAlphaThreshold:10,clearAlphaColor:0xFF});
    console.log(palette)
    console.log(palette.length)
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, totalWidth, baseH);

    if(totalMiliSeconds<1000)
    {
      //encoder.start();
      //encoder.setRepeat(-1);   
      //encoder.setTransparent("0xffffff");
      //encoder.setDelay(1000);  
      //encoder.setQuality(10); 
      
      // const imgBackground = await Canvas.loadImage('assets/back/back.png');
      // ctx.drawImage(imgBackground, 0, 0, totalWidth, totalHeight);

      if(nodays==0)
      {
        const imageDFromPng = await Canvas.loadImage('assets/'+timerId+"/d0"+(darkmode==1?"_dark":"")+".png");
        ctx.drawImage(imageDFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
        positionCounter=positionCounter+1;
      }

      const imageHFromPng = await Canvas.loadImage('assets/'+timerId+"/h0"+(darkmode==1?"_dark":"")+".png");
      ctx.drawImage(imageHFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
      positionCounter=positionCounter+1;
      const imageMFromPng = await Canvas.loadImage('assets/'+timerId+"/m0"+(darkmode==1?"_dark":"")+".png");
      ctx.drawImage(imageMFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
      positionCounter=positionCounter+1;
      const imageSFromPng = await Canvas.loadImage('assets/'+timerId+"/s0"+(darkmode==1?"_dark":"")+".png");
      ctx.drawImage(imageSFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
      
      
      
      for(var i=0;i<3;i++)
      {
        const dataCtx=ctx.getImageData(0,0,totalWidth,totalHeight);
        const index = applyPalette(dataCtx.data, palette);
        encoder.writeFrame(index, dataCtx.width, dataCtx.height, { palette:palette,delay:1000,transparent:true });
      }


    }
    else
    {
      // if(Math.floor(totalMiliSeconds/1000)<nFrames)
      // {
      //   encoder.start();
      //   encoder.setRepeat(-1);   
      //   encoder.setTransparent("0xffffff");
      //   encoder.setDelay(1000);  
      //   encoder.setQuality(10); 
      // }
      // else
      // {
      //   encoder.start();
      //   encoder.setRepeat(0);   
      //   encoder.setTransparent("0xffffff");
      //   encoder.setDelay(1000); 
      //   encoder.setQuality(10); 
      // }

      
      

      //ctx.clearRect(0, 0, totalWidth, totalHeight);
      
      
      // console.log("Got it")
      // console.log(palette)


      var remainingDays=Math.floor((totalMiliSeconds)/(1000*3600*24))
      if(nodays==1)
      {
        remainingDays=0;
      }
      var remainingHours=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24)))/(1000*3600))
      var remainingMinutes=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24))-(remainingHours*(1000*3600)))/(1000*60))
      var remainingSeconds=Math.floor((totalMiliSeconds-(remainingDays*(1000*3600*24))-(remainingHours*(1000*3600))-(remainingMinutes*(1000*60)))/(1000))

      for (var i = nFrames; i >= 0; i--) {
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

          if(nodays==0)
          {
            if(remainingHours<0)
            {
                remainingHours=23
                remainingDays=remainingDays-1;
            }
          }

          positionCounter=0;
          
          
          //ctx.clearRect(0, 0, totalWidth, totalHeight);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, totalWidth, baseH);
          
          // const imgBackground = await Canvas.loadImage('assets/back/back.png');
          // ctx.drawImage(imgBackground, 0, 0, totalWidth, totalHeight);
          
          //console.time("writeOneFrame");

          //console.log("more than 1000")
          if(nodays==0)
          {
            const imageDFromPng = await Canvas.loadImage('assets/'+timerId+"/d"+(remainingDays<=0?0:remainingDays)+(darkmode==1?"_dark":"")+'.png');
            ctx.drawImage(imageDFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
            positionCounter=positionCounter+1;
          }

          
          
          const imageHFromPng = await Canvas.loadImage('assets/'+timerId+"/h"+(remainingHours<=0?0:remainingHours)+(darkmode==1?"_dark":"")+'.png');
          ctx.drawImage(imageHFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
          positionCounter=positionCounter+1;
          const imageMFromPng = await Canvas.loadImage('assets/'+timerId+"/m"+(remainingMinutes<=0?0:remainingMinutes)+(darkmode==1?"_dark":"")+'.png');
          ctx.drawImage(imageMFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
          positionCounter=positionCounter+1;
          const imageSFromPng = await Canvas.loadImage('assets/'+timerId+"/s"+(remainingSeconds<=0?0:remainingSeconds)+(darkmode==1?"_dark":"")+'.png');
          ctx.drawImage(imageSFromPng, baseW*positionCounter+paddingLeft, 0, baseW, baseH);
          //encoder.addFrame(ctx);
          
          const dataCtx=ctx.getImageData(0,0,totalWidth,totalHeight);

          
          const index = applyPalette(dataCtx.data, palette);
          encoder.writeFrame(index, dataCtx.width, dataCtx.height, { palette:palette,delay:1000,transparent:true,transparentIndex:200});
          //console.timeEnd("writeOneFrame");

          positionCounter=positionCounter+1;

          if(remainingDays==0 && remainingHours==0 && remainingMinutes==0 && remainingSeconds==0)
          {
            
            break;
          }
      }   

      
    }

    encoder.finish();

    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(encoder.bytes(), 'binary');
  }

};
