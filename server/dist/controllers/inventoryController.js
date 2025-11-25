"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBatch = exports.createMedicine = exports.getMedicines = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all medicines
const getMedicines = async (req, res) => {
    try {
        const medicines = await prisma.medicine.findMany({
            include: { batches: true },
        });
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching medicines', error });
    }
};
exports.getMedicines = getMedicines;
// Create a new medicine
const createMedicine = async (req, res) => {
    try {
        const { name, genericName, category, manufacturer } = req.body;
        const medicine = await prisma.medicine.create({
            data: { name, genericName, category, manufacturer },
        });
        res.status(201).json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating medicine', error });
    }
};
exports.createMedicine = createMedicine;
// Add a batch to a medicine
const addBatch = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding batch', error });
    }
};
exports.addBatch = addBatch;
