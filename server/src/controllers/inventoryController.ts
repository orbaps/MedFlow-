import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all medicines
export const getMedicines = async (req: Request, res: Response) => {
    try {
        const medicines = await prisma.medicine.findMany({
            include: { batches: true },
        });
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medicines', error });
    }
};

// Create a new medicine
export const createMedicine = async (req: Request, res: Response) => {
    try {
        const { name, genericName, category, manufacturer } = req.body;
        const medicine = await prisma.medicine.create({
            data: { name, genericName, category, manufacturer },
        });
        res.status(201).json(medicine);
    } catch (error) {
        res.status(500).json({ message: 'Error creating medicine', error });
    }
};

// Add a batch to a medicine
export const addBatch = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.params;
        const { batchNumber, quantity, expiryDate, location, status } = req.body;

        const batch = await prisma.batch.create({
            data: {
                medicineId,
                batchNumber,
                quantity: parseInt(quantity),
                expiryDate: new Date(expiryDate),
                location,
                status,
            },
        });
        res.status(201).json(batch);
    } catch (error) {
        res.status(500).json({ message: 'Error adding batch', error });
    }
};
