"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomAPIError';
    }
}
exports.CustomAPIError = CustomAPIError;
