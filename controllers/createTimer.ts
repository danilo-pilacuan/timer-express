import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';  
import Path from 'path';  
import Fs from 'fs';  
import Util from 'util';  
import { v4 as uuidv4 } from "uuid";

const ReadFile = Util.promisify(Fs.readFile)

export const createTimer = async (req: Request, res: Response) => {

const timeruuid=uuidv4();

  console.log(req.body);

  const numbersColor=req.body.numbersColor;
  const descriptionColor=req.body.descriptionColor;
  const backgroundColor=req.body.backgroundColor;
  const timerType=req.body.timerType;
  
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
      width: 240,
      height: 240,
      
  }); 
  await page.emulateMediaFeatures([
    {name: 'prefers-color-scheme', value: 'light'},
  ]);     

  const templatePath = Path.resolve('src/assets/html/plantilla.html')
  const content = await ReadFile(templatePath, 'utf8')

  const template = Handlebars.compile(content)

  if (!Fs.existsSync('src/assets/cache/'+timeruuid+"/")){
    Fs.mkdirSync('src/assets/cache/'+timeruuid+"/");
  }

  for(var i=0;i<=240;i++)
  {
    const dataMinutos = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'MINUTOS',
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100)),
      numbersColor:numbersColor,
      descriptionColor:descriptionColor,
      backgroundColor:backgroundColor,
      timer1:timerType=="1"?"1":null,
      timer2:timerType=="2"?"1":null,
      timer3:timerType=="3"?"1":null,
      timer4:timerType=="4"?"1":null,
      adicional:"Hola"
    }

    console.log(dataMinutos)
    

    const htmlHandleBars = template(dataMinutos);


    if (!Fs.existsSync('src/assets/cache/'+timeruuid+"/")){
      Fs.mkdirSync('src/assets/cache/'+timeruuid+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/m"+i.toString()+".png",omitBackground: true});

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)

    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/m"+i.toString()+"_dark.png",omitBackground: true});




  }
  
  for(var i=0;i<=240;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'HORAS',
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100)),
      numbersColor:numbersColor,
      descriptionColor:descriptionColor,
      backgroundColor:backgroundColor,
      timer1:timerType=="1"?"1":null,
      timer2:timerType=="2"?"1":null,
      timer3:timerType=="3"?"1":null,
      timer4:timerType=="4"?"1":null
    }

    const htmlHandleBars = template(data);

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/h"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/h"+i.toString()+"_dark.png",omitBackground: true});

  }
  
  for(var i=0;i<=59;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'SEGUNDOS',
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100)),
      numbersColor:numbersColor,
      descriptionColor:descriptionColor,
      backgroundColor:backgroundColor,
      timer1:timerType=="1"?"1":null,
      timer2:timerType=="2"?"1":null,
      timer3:timerType=="3"?"1":null,
      timer4:timerType=="4"?"1":null
    }

    const htmlHandleBars = template(data);

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/s"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screend=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/s"+i.toString()+"_dark.png",omitBackground: true});

  }
  console.log("assets secs ok")
  for(var i=0;i<=59;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'DÍAS',
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100)),
      numbersColor:numbersColor,
      descriptionColor:descriptionColor,
      backgroundColor:backgroundColor,
      timer1:timerType=="1"?"1":null,
      timer2:timerType=="2"?"1":null,
      timer3:timerType=="3"?"1":null,
      timer4:timerType=="4"?"1":null
    }

    const htmlHandleBars = template(data);
    

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/d"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'src/assets/cache/'+timeruuid+"/d"+i.toString()+"_dark.png",omitBackground: true});

  }

  
  res.send({uuid:timeruuid});



};
