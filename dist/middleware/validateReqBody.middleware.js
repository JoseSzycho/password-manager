"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = void 0;
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_1 = __importDefault(require("ajv"));
const validateReqBody = (schema) => {
    return (req, res, next) => {
        const ajv = new ajv_1.default({ allErrors: true, verbose: true });
        (0, ajv_formats_1.default)(ajv, ['email']);
        const validate = ajv.compile(schema);
        if (validate(req.body)) {
            next();
            return;
        }
        else {
            res.status(409).json(validate.errors);
        }
    };
};
exports.validateReqBody = validateReqBody;
//# sourceMappingURL=validateReqBody.middleware.js.map