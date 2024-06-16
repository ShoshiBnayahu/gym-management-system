import express from 'express';
import { delete_meeting, get_meeting, get_meetings, post_meeting, put_meeting } from '../controllers/meetingController';

const router = express.Router();

router.post('/', post_meeting);
router.get('/', get_meetings);
router.get('/:meetingId', get_meeting);
router.put('/', put_meeting);
router.delete('/:meetingId', delete_meeting);

export default router;