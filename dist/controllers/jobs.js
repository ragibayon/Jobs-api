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
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield Job_1.default.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, count: jobs.length });
});
exports.getAllJobs = getAllJobs;
const getJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.id;
    const job = yield Job_1.default.findOne({ _id: jobId, createdBy: req.user.userId });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job found with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ job });
});
exports.getJob = getJob;
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, position } = req.body;
    if (!company || !position) {
        throw new errors_1.BadRequestError('Please provide company and position');
    }
    const newJob = {
        company,
        position,
        createdBy: req.user.userId,
    };
    const job = yield Job_1.default.create(newJob);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.createJob = createJob;
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.id;
    const { company, position } = req.body;
    if (company === '' || position == '') {
        throw new errors_1.BadRequestError('Please provide valid company or position');
    }
    const job = yield Job_1.default.findOneAndUpdate({
        _id: jobId,
        createdBy: req.user.userId,
    }, Object.assign({}, req.body), {
        runValidators: true,
        new: true,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job found with id ${jobId}`);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
});
exports.updateJob = updateJob;
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const job = yield Job_1.default.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new errors_1.NotFoundError(`No Job found with id ${jobId}`);
    }
    res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
});
exports.deleteJob = deleteJob;
