import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({

  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {

  return `${file.originalname}`;
}

// ---------------------------------------------------------------------
//                    CSV
// ---------------------------------------------------------------------
export const storageCsv = diskStorage({
  destination: './uploads/csv',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateCSVFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}
