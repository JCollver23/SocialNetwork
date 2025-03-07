"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_js_1 = __importDefault(require("./config/connection.js"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const cwd = process.cwd();
const PORT = 3001;
const app = (0, express_1.default)();
// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
    ? cwd.split('01-Activities')[1]
    : cwd;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(index_js_1.default);
(0, connection_js_1.default)().then((connection) => {
    connection.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server for ${activity} running on port ${PORT}!`);
        });
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});
