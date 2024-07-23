

export const createSMS = (req, res, next)=>{
    const userId = req.body.userId
    if(!userId) return next(customError(400, "Kindly provide the necessary details"))
    // -------SMS logic here------
}