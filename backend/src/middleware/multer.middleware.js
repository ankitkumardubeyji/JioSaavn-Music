// uploading the file to the local storage server through the multer middleware.


import multer from "multer"

// the function defines how the file should be stored in the disk.
const storage = multer.diskStorage({

    
    diskStorage:function(req,file,cb){
        cb(null,'./public/temp') // destination folder for uploading the stored files 
    },

    // using the original file name as the name of the file
    fileName:function(req,file,cb){
        cb(null,file.originalname)
    }
})


// initialsing the multer middleware with the storage configuration
export const upload = multer({
    storage 
})