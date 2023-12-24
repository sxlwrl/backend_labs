import jwt, {JwtPayload} from 'jsonwebtoken';
import {RequestHandler} from "express";

export const authenticateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({status: res.statusCode, message: 'Unauthorized'});
    }

    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
        if (err) return res.status(403).json({status: res.statusCode, message: 'Forbidden'});
        req.body._userId = (user as JwtPayload).userId;
        next();
    });
};