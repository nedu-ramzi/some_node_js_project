import formidable from "formidable";

export const uploadProfileImage = async function (req, res, next) {

    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
        }
        
        const {profileImage} = files;
    });
}