import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "ajwtsecret";
const authenticateJWT = (req, res, next) => {
    var _a;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing!",
        });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token missing!",
        });
    }
    try {
        // verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // attach user to request
        req.user = decoded;
        next();
    }
    catch (_b) {
        return res.status(403).json({
            message: "Invalid or Expired token",
        });
    }
};
export default authenticateJWT;
