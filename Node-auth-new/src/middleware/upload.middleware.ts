import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../helpers/errors.helpers";


export function uploadMiddleware(folderName: string = "Api Pictures") {
    // Sanitize folderName to remove any non-alphanumeric characters
    const sanitizedFolderName = folderName.replace(/[^a-zA-Z0-9-_]/g, '');
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            const folderPath = `${sanitizedFolderName}`.trim(); // Update the folder path here
            const fileExtension = file.originalname.split('.').pop(); // Extract file extension
            const publicId = `${file.fieldname}-${uuidv4()}-${Date.now()}`;

            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new ApplicationError(`Unsupported file format: ${file.mimetype}`, 400);
            }

            return {
                folder: folderPath,
                public_id: publicId,
                format: fileExtension,
            };
        },
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024, // 5 MB
        },
    });

    return (req: Request, res: Response, next: NextFunction)=>{
        upload.single('file')(req, res, (err:any)=>{
            if(err){
                return res.status(400).json({
                    success: false,
                    message: "File upload failed",
                    msg: err.message
                });
            }
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            next();
        });
    };

}