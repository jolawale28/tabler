// utils/jwt.ts
const jwt = require('jsonwebtoken')

const SECRET_KEY = '2fast2furious';

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};
