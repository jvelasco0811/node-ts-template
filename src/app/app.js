"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helloWorld_route_1 = require("./routes/helloWorld.route");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var RateLimiter_1 = require("../app/middlewares/RateLimiter");
var app = (0, express_1.default)();
app.use(RateLimiter_1.default);
app.use(helmet_1.default.xssFilter());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.frameguard({ action: 'deny' }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/hello/v2', helloWorld_route_1.default);
process.on('uncaughtException', function (error) {
    console.error('Uncaught Exception:', error);
});
exports.default = app;
