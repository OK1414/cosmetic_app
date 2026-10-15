import jwt from "jsonwebtoken";

const SECRET_KEY = "helloitsapurvaandthisisour@2prokject";

export const auth_middleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};

export default auth_middleware;