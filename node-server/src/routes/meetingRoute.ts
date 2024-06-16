import express from 'express';
import { delete_meeting, get_meeting, get_meetings, post_meeting, put_meeting } from '../controllers/meetingController';
import { adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', post_meeting);
router.get('/', get_meetings);
router.get('/:meetingId', get_meeting);
router.put('/',adminOnly, put_meeting);
router.delete('/:meetingId',adminOnly, delete_meeting);

export default router;