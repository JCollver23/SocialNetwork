"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const thoughtRoutes_1 = __importDefault(require("./thoughtRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
router.use('/users', userRoutes_1.default);
router.use('/thoughts', thoughtRoutes_1.default);
exports.default = router;
