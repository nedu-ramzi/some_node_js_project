import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class UserController {
    //Upload Profile picture
    async profilePicture(req: Request, res: Response) {
        try {
            //extract user id from the url params
            const id = req.params.id;     
            
            //cloudinary file url to save to db
            const fileUrl = req.file.path;

            const user = await User.findByIdAndUpdate(id, { profileImage: fileUrl }, { new: true });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            user.save();

            res.status(200).json({
                success: true,
                message: "Profile Picture uploaded successfully",
                data: { user, fileUrl }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            })
        }
    }

    //Get a user by id
    async getAuser(req: Request, res: Response){
        const id = req.params;

    }

    // get all users | For Admins
    async getAllUsers(req: Request, res: Response){
        const user = User.find();
    }

    //Update user
    async updateUser(req: Request, res: Response){
        const {username, email, password} = req.body;
    }

    //Delete User
    async deleteUser(req: Request, res: Response) {
        const  id  = req.params;
    }
}