import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get alerts for an entity
export const getAlerts = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alerts', error });
    }
};

// Create a new alert
export const createAlert = async (req: Request, res: Response) => {
    try {
        const { type, message, entityId } = req.body;

        const alert = await prisma.alert.create({
            data: { type, message, entityId },
        });
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: 'Error creating alert', error });
    }
};
