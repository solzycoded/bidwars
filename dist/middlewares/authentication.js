import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
    var _a;
    const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "You're not authorized to perform this action!",
        });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "You're not authorized to perform this action!",
        });
    }
    // { username: string, id: ObjectId, role: string }
    // verify token
    const JWT_SECRET = process.env.JWT_SECRET || "ajwtsecret";
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach user to request
    req.user = decoded;
};
const authenticateJWT = (req, res, next) => {
    try {
        authenticateUser(req, res, next); // authenticate the user
        next();
    }
    catch (_a) {
        return res.status(403).json({
            message: "Invalid or Expired token",
        });
    }
};
export default authenticateJWT;
