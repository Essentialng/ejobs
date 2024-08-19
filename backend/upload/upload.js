import multer from "multer";

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './upload')
    },
    filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
    })
export const upload = multer({storage: storage})