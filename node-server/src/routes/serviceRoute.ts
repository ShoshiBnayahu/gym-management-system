import express from 'express';
import { delete_service, get_service, get_services, post_service, put_service } from '../controllers/serviceController';

const router = express.Router();


router.post('/',  post_service);
router.get('/', get_services);
router.get('/:serviceId', get_service);
router.put('/', put_service);
router.delete('/:serviceId', delete_service)
export default router;