import {RequestHandler} from 'express';
import {validationResult} from 'express-validator/src/validation-result';

export const checkValidation: RequestHandler = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({status: res.statusCode, message: 'Invalid userID or categoryID type'});
        } else {
            next();
        }
    } catch (err: any) {
        res.status(500).json('errors.Unknown');
    }
}
