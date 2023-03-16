import { Request, Response } from "express";
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';  
import Path from 'path';  
import Fs from 'fs';  
import Util from 'util';  
const ReadFile = Util.promisify(Fs.readFile)

export const createTimer = async (req: Request, res: Response) => {
const file = req.file;
if (!file) {
    res.status(500).send('No se ha especificado style');
}
else
{
const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
      width: 240,
      height: 240,
      
  }); 
  await page.emulateMediaFeatures([
    {name: 'prefers-color-scheme', value: 'light'},
  ]);     

  const templatePath = Path.resolve('assets/html/plantilla.html')
  const content = await ReadFile(templatePath, 'utf8')

  const template = Handlebars.compile(content)

  

  for(var i=0;i<=59;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'MINUTOS',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);


    if (!Fs.existsSync('assets/cache/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/cache/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/m"+i.toString()+".png",omitBackground: true});

    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/m"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=240;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'HORAS',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    if (!Fs.existsSync('assets/cache/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/cache/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/h"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/h"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=59;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'SEGUNDOS',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    
    if (!Fs.existsSync('assets/cache/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/cache/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/s"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screend=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/s"+i.toString()+"_dark.png",omitBackground: true});

  }

  for(var i=0;i<=59;i++)
  {
    const data = {
      digitos:((i<10?"0":"")+i.toString()).split(''),
      message: 'DÍAS',
      plantilla:"uploads/css/"+req.file.filename,
      valorPorcentaje: -Math.ceil(648 - ((648*(i*100/60))/100))
    }

    const htmlHandleBars = template(data);
    
    if (!Fs.existsSync('assets/cache/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/cache/'+Path.parse(req.file.filename).name+"/");
    }
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'light'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/d"+i.toString()+".png",omitBackground: true});
    
    await page.emulateMediaFeatures([ {name: 'prefers-color-scheme', value: 'dark'}, ]);     
    await page.setContent(htmlHandleBars)
    const screenD=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/cache/'+Path.parse(req.file.filename).name+"/d"+i.toString()+"_dark.png",omitBackground: true});

  }

  
  res.send({uuid:Path.parse(req.file.filename).name});

}

};
