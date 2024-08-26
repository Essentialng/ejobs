import multer from "multer";
import path from 'path'


export const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public')
        console.log('done 1')
    },
    filename: (req, file, cb)=>{
        const ext = path.extname(file.originalname)

        const uniqueSurfix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    
        cb(null, file.fieldname + '-' + uniqueSurfix + ext)
    } 
})