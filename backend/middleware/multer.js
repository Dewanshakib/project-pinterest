import multer from "multer"

// creating storage
const storage = multer.memoryStorage()

// upload file function
const uploadFile = multer({storage}).single("file")

export default uploadFile