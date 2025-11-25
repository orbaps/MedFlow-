"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const router = (0, express_1.Router)();
router.get('/forecast/:medicineId', aiController_1.getDemandForecast);
router.get('/expiry-risk/:hospitalId', aiController_1.getExpiryRisk);
exports.default = router;
