import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import fsSync from 'fs'

function getMimeType(filename) {
        const ext = path.extname(filename).toLowerCase()
        switch (ext) {
                case '.png':
                    return 'image/png'
                case '.jpg':
                case '.jpeg':
                    return 'image/jpeg'
        case '.gif':
            return 'image/gif'
        default:
            return 'application/octet-stream'
    }
}

// ---------Version 2--------
export const getImage = async (req, res, next) => {
    try {
        const filename = req.params.filename;
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const filepath = path.join(__dirname, '../public', filename);
        
        const stat = await fs.stat(filepath);
        const fileSize = stat.size;
      const range = req.headers.range;
  
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fsSync.createReadStream(filepath, {start, end});
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': getMimeType(filename),
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': getMimeType(filename),
        };
        res.writeHead(200, head);
        fsSync.createReadStream(filepath).pipe(res);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };