import express from 'express';
import { delete_business, get_business, get_businesses, post_business, put_business } from '../controllers/businessController';

const router = express.Router();

router.post('/', post_business);
router.get('/', get_businesses);
router.get('/:businessId', get_business);
router.put('/', put_business);
router.delete('/:businessId', delete_business);

export default router;