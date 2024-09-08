import express from 'express';
import { delete_meeting, get_meeting, get_meetings, post_meeting, put_meeting } from '../controllers/meetingController';
import { adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meeting
 *   description: Meeting operations
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meeting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       201:
 *         description: Meeting created successfully
 */
router.post('/', post_meeting);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meeting]
 *     responses:
 *       200:
 *         description: List of all meetings
 */
router.get('/', get_meetings);

/**
 * @swagger
 * /{meetingId}:
 *   get:
 *     summary: Get a single meeting by ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Meeting details
 *       404:
 *         description: Meeting not found
 */
router.get('/:meetingId', get_meeting);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meeting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 */
router.put('/', adminOnly, put_meeting);

/**
 * @swagger
 * /{meetingId}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 */
router.delete('/:meetingId', adminOnly, delete_meeting);


export default router;
