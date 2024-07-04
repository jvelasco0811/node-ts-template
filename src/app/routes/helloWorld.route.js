"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HelloWorldController_1 = require("../controllers/HelloWorldController");
var router = (0, express_1.Router)();
router.get('/', HelloWorldController_1.HelloWorldController);
exports.default = router;
