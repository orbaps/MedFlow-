"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("../controllers/inventoryController");
const router = (0, express_1.Router)();
router.get('/medicines', inventoryController_1.getMedicines);
router.post('/medicines', inventoryController_1.createMedicine);
router.post('/medicines/:medicineId/batches', inventoryController_1.addBatch);
exports.default = router;
