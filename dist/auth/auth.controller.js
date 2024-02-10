"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
class AuthController {
    constructor() {
        this.signUp = (req, res) => {
            res.status(200).json(req.body);
        };
    }
}
const authController = new AuthController();
exports.authController = authController;
//# sourceMappingURL=auth.controller.js.map