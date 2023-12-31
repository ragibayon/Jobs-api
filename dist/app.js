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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
require('express-async-errors');
const jobs_1 = __importDefault(require("./routes/jobs"));
const auth_1 = __importDefault(require("./routes/auth"));
const connect_1 = __importDefault(require("./db/connect"));
// security packages
const helmet_1 = __importDefault(require("helmet"));
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const app = (0, express_1.default)();
// error handler
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
// auth middleware
const authentication_1 = require("./middleware/authentication");
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(cors());
app.use(xss());
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));
// routes
app.get('/', (req, res, next) => {
    res.send('<h1> Jobs API</h1><a href ="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/jobs', authentication_1.authenticateUser, jobs_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(process.env.MONGODB_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
