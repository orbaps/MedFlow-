"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlert = exports.getAlerts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get alerts for an entity
const getAlerts = async (req, res) => {
    try {
        const { entityId } = req.query;
        if (!entityId) {
            return res.status(400).json({ message: 'Entity ID is required' });
        }
        const alerts = await prisma.alert.findMany({
            where: { entityId: String(entityId) },
            orderBy: { createdAt: 'desc' },
        });
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching alerts', error });
    }
};
exports.getAlerts = getAlerts;
// Create a new alert
const createAlert = async (req, res) => {
    try {
        const { type, message, entityId } = req.body;
        const alert = await prisma.alert.create({
            data: { type, message, entityId },
        });
        res.status(201).json(alert);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating alert', error });
    }
};
exports.createAlert = createAlert;
