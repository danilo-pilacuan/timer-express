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
      message: 'Días',
      plantilla:"uploads/css/"+req.file.filename
    }

    const htmlHandleBars = template(data);
    
    await page.setContent(htmlHandleBars)
    if (!Fs.existsSync('assets/'+Path.parse(req.file.filename).name+"/")){
      Fs.mkdirSync('assets/'+Path.parse(req.file.filename).name+"/");
    }
    const screenP=await page.screenshot({type:"png",captureBeyondViewport:false,path: 'assets/'+Path.parse(req.file.filename).name+"/d"+i.toString()+".png"});

  }

  
  res.send({uuid:Path.parse(req.file.filename).name});

}

};
