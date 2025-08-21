
import multer from 'multer';
import path from 'node:path';


const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()+ '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });