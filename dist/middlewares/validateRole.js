"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const generateToken_1 = require("../helpers/generateToken");
const validateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("auth-header");
        const tokenData = yield (0, generateToken_1.verifyToken)(token);
        console.log(tokenData);
        const { role } = req.params;
        if (role == "USER_ROLE") {
            next();
        }
        else {
            throw new Error;
        }
    }
    catch (error) {
        return ("No valid jwt");
    }
});
exports.validateRole = validateRole;
