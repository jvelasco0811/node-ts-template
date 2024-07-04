"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = require("express-rate-limit");
var RateLimiter = /** @class */ (function () {
    function RateLimiter() {
        var _this = this;
        this.rateLimitMiddleware = function (req, res, next) {
            _this.limiter(req, res, next);
        };
        this.limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too many requests, please try again later.',
        });
    }
    return RateLimiter;
}());
var limiter = new RateLimiter().rateLimitMiddleware;
exports.default = limiter;
