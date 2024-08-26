import jwt from 'jsonwebtoken'

export const generateVerificationCode = ()=>{
    return (Math.floor(100000 * Math.random()) * 900000).toString()
}


export const generateTokenAndCookie = (res, userId)=>{
    const jwtSecret = process.env.secret || "weAreEssential"
    const token = jwt.sign({userId: userId}, jwtSecret, {expiresIn:"24h"})
    res.status(200)
    .cookie('access_token', token, {
        httpOnly: true,
        signed: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,    // 24hrs
        sameSite: 'lax'
    })
    
    return token
}

export const verifyEmailToken = (token)=>{
    const jwtSecret = process.env.secret || "weAreEssential"
    try {
        jwt.verify(token, jwtSecret, (err, userId)=>{
            console.log(err, userId)
            if(err){ return({isValid: false, userId: null})}
            return({isValid: true, userId: userId})   
        })
    } catch (error) {
        console.log(error)
        return({isValid: false, userId: null})
    }
}