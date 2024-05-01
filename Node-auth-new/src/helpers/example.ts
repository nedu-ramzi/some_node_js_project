export const requestPasswordReset = async (req, res, next) => {
    //check for user via email
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) { throw new CustomError("invalid email", 401) }

        //generate token  and send email=============================

        const token = generateToken();

        console.log(token)

        const hashedToken = await argon.hash(token)

        console.log("werwerrwerw")
        ///save to the record

        const resetRecord = await PasswordReset.create({
            user: user,
            resetToken: hashedToken
        })

        ////send token via email==================================

        await resetRecord.save()


        return res.status(201).json({
            success: true,
            data: resetRecord
        })

    } catch (err) {
        next(err)

    }

}

export const passwordReset = async (req, res, next) => {

    //get new password
    const { token } = req.params
    const { newpassword } = req.body


    ////find user with token


    try {
        // const tokenhash = await argon.hash(token)

        const passwordReset = await PasswordReset.findOne({

            resetToken: token,
            expiresIn: { $gt: Date.now() },

        }).populate('user')

        console.log(passwordReset)

        if (!passwordReset) { throw new CustomError("invalid or expired token", 401) }


        if (!passwordReset.user || !passwordReset.user._id) {
            throw new CustomError("User information not available", 401);
        }
        ////has password
        console.log(newpassword)
        const hash = await argon.hash(newpassword)


        console.log(passwordReset.user._id)

        const updateduserinfo = await User.findByIdAndUpdate(
            passwordReset.user._id,
            { password: hash },
            { new: true }
        )


        return res.status(201).json({
            message: "password reset successful",
            data: updateduserinfo
        })
        ///=====================================email
    } catch (err) {
        next(err)
    }





}