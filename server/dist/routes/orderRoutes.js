"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.get('/', orderController_1.getOrders);
router.post('/', orderController_1.createOrder);
router.patch('/:orderId/status', orderController_1.updateOrderStatus);
exports.default = router;
