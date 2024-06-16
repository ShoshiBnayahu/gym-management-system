import express from 'express';
import { delete_business, get_business, get_businesses, post_business, put_business } from '../controllers/businessController';
import { adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/',adminOnly, post_business);
router.get('/', get_businesses);
router.get('/:businessId', get_business);
router.put('/',adminOnly, put_business);
router.delete('/:businessId',adminOnly, delete_business);

export default router;