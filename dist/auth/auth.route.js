"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const middleware_1 = require("../middleware");
const auth_schema_1 = require("./schema/auth.schema");
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/signup', (0, middleware_1.validateReqBody)(auth_schema_1.authSchema), auth_controller_1.authController.signUp);
//# sourceMappingURL=auth.route.js.map