
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now + "-" + file.originalname)
    }
})
const upload = multer({storage:storage}).single('file')
let filePath
app.post('/images', async (req, res) => {
    try {
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: req.body.message,
            n: 1,
            size: "1024x1024"
        });
        
        res.send(image.data.data);
        console.log('API Response:', image.data.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/upload", (req,res)=>{

    upload(req, res, (err) => {
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }
        else if(err){
            return res.status(500).json(err)
        }
        filePath = req.file.path
    })
})

app.post('/variations', async (req, res)=>{
    try{
        const image = await openai.images.createVariation({
            image: fs.createReadStream(filePath),
            n: 1,
            size:"1024x1024",
            
          });
    }catch (error){
        console.error(error)

    }
})



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
