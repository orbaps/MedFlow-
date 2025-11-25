import { Router } from 'express';
import { getMedicines, createMedicine, addBatch } from '../controllers/inventoryController';

const router = Router();

router.get('/medicines', getMedicines);
router.post('/medicines', createMedicine);
router.post('/medicines/:medicineId/batches', addBatch);

export default router;
