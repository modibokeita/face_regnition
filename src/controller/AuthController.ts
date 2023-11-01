import { Request, Response } from 'express'
import FaceRecognition from '../services/FaceRecognition'
import { nanoid } from 'nanoid'
import fs from 'fs'
// import db from '../common/db_connection'

class AuthController {
  static async register(req: Request, res: Response) {
    // const idcamera = req.body.idcamera
    const name = req.body.name
    console.log(name)
    const image = req.body.photos

    const data = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    const fileName = name;

    fs.writeFile(`./images/${fileName}.jpg`, buf, async function (err : any) {
        if (err) return res.status(401).send('error');
        return res.status(200).send('ok');
          
      })
    
    

  }

  static async login(req: Request, res: Response) {
    try {      
      console.log('run');
      const user = req.body.user;
      const image = req.body.photos;
  
      const data = image.replace(/^data:image\/\w+;base64,/, "");
      const buf = Buffer.from(data, 'base64');
      const fileName = user + '-' + nanoid();
  
      fs.writeFile(`./uploads/${fileName}.jpg`, buf, async function (err : any) {
        if (err) console.log(err)
        const imageInput = `./uploads/${fileName}.jpg`;
        const recognize = new FaceRecognition(imageInput, user);
  
        const resultRecognize = await recognize.recognize().catch(e=> res.status(401).send(e.message));
        
        return res.send(resultRecognize);
      });
    } catch (error: any) {
      return res.status(401).send(error.message);
    }
  }
}

export default AuthController;