import { shortUrl } from '../model/url.model.js';

export const createUrl = async (req, res, next) => {

    try {
        const { full } = req.body;

        const url = await shortUrl.create({ full });
        url.save();


        return res.status(200).json({
            "success": true,
            "message": "Created Successfully",
            "url": url
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }

}