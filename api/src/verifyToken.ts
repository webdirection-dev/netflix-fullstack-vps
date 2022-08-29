import {Request, Response, NextFunction} from 'express'
const jwt = require('jsonwebtoken')

interface IUser {
    id: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}

interface IReqUser extends Request {
    user: IUser
}

function verify(req: IReqUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json('You are not authenticated!')

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err: Error, user: IUser) => {
            if (err) return res.status(403).json('Token is not valid!')
            req.user = user
            next()
        }
    )
}

module.exports = verify