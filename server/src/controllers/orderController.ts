import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get orders (filtered by entity)
export const getOrders = async (req: Request, res: Response) => {
    try {
        const { entityId, role } = req.query;

        let whereClause = {};
        if (role === 'HOSPITAL_MANAGER') {
            whereClause = { fromEntityId: entityId };
        } else if (role === 'RETAILER') {
            whereClause = { toEntityId: entityId };
        }

        const orders = await prisma.order.findMany({
            where: whereClause,
            include: { medicine: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
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
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
