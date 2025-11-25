import { Router } from 'express';
import { getDemandForecast, getExpiryRisk } from '../controllers/aiController';

const router = Router();

router.get('/forecast/:medicineId', getDemandForecast);
router.get('/expiry-risk/:hospitalId', getExpiryRisk);

export default router;
