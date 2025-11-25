import { Router } from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.patch('/:orderId/status', updateOrderStatus);

export default router;
