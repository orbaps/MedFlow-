"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.createOrder = exports.getOrders = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get orders (filtered by entity)
const getOrders = async (req, res) => {
    try {
        const { entityId, role } = req.query;
        let whereClause = {};
        if (role === 'HOSPITAL_MANAGER') {
            whereClause = { fromEntityId: entityId };
        }
        else if (role === 'RETAILER') {
            whereClause = { toEntityId: entityId };
        }
        const orders = await prisma.order.findMany({
            where: whereClause,
            include: { medicine: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
exports.getOrders = getOrders;
// Create a new order
const createOrder = async (req, res) => {
    try {
        const { fromEntityId, toEntityId, medicineId, quantity, priority } = req.body;
        const order = await prisma.order.create({
            data: {
                fromEntityId,
                toEntityId,
                medicineId,
                quantity: parseInt(quantity),
                status: 'New',
                priority,
            },
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};
exports.createOrder = createOrder;
// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
exports.updateOrderStatus = updateOrderStatus;
