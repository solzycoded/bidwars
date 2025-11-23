import { authenticateUser } from "./authentication.js";
export const admin = (req, res, next) => {
    var _a;
    try {
        authenticateUser(req, res, next);
        if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
            // unset user key from the "req" object
            delete req.user;
            // return a 401 response, indicating invalid request
            return res.status(401).json({
                message: "You're not authorized to perform this action!",
            });
        }
        next();
    }
    catch (_b) {
        return res.status(403).json({
            message: "Unauthorized access!",
        });
    }
};
