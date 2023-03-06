import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';  
import Path from 'path';  
import Fs from 'fs';  
import Util from 'util';  
const ReadFile = Util.promisify(Fs.readFile)

export const createTimerCanvas = async (req: Request, res: Response) => {
const file = req.file;
if (!file) {
    res.status(500).send('No se ha especificado style');
}
else
{
const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
      width: 120,
      height: 120,
      
  }); 
  await page.emulateMediaFeatures([
    {name: 'prefers-color-scheme', value: 'light'},
  ]);     

  const templatePath = Path.resolve('plantilla.html')
  const content = await ReadFile(templatePath, 'utf8')

  const template = Handlebars.compile(content)

  

  for(var i=0;i<=59;i++)
  {
    const data = {
      counter:(i<10?"0":"")+i.toString(),
      message: 'Minutos',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -(339 - ((339*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);

    console.log(htmlHandleBars);

    if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/m"+i.toString()+".png",omitBackground: true});

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/m"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=60;i++)
  {
    const data = {
      counter:(i<10?"0":"")+i.toString(),
      message: 'Horas',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -(339 - ((339*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/h"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/h"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=59;i++)
  {
    const data = {
      counter:(i<10?"0":"")+i.toString(),
      message: 'Segundos',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -(339 - ((339*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    
    if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/s"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screend=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/s"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=59;i++)
  {
    const data = {
      counter:(i<10?"0":"")+i.toString(),
      message: 'Días',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -(339 - ((339*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    
    if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/d"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/d"+i.toString()+"_dark.png",omitBackground: true});

  }

  
  res.send({uuid:Path.parse(req.file.filename).name});

}

};
