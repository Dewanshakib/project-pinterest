import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUrl = (file) => {
  const parser = new DataUriParser();

  // validate file   
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object: missing originalName or buffer.");
  }

  // creating extension name
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUrl;
