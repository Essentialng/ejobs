import jwt from "jsonwebtoken"
import { customError, errorHandler } from "./errorHandler.js"

export const verifyUserToken = (req,res,next)=>{
    const token = req.signedCookies.access_token
    console.log({cookie: req.signedCookies})
    const jwtSecret = process.env.secret || "weAreEssential"
    if(!token){
        next(customError(401, "UnAuthorized"))
        return
    }
    try {
        jwt.verify(token, jwtSecret,(err, user)=>{
            if(err){
                next(customError(400, 'Invalid token'))
                return
            }
            req.user = user;
            next();
        })
    } catch (error) {
        next(error)
    }
}