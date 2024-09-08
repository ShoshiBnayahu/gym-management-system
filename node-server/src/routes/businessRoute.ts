import express from 'express';
import { delete_business, get_business, get_businesses, post_business, put_business } from '../controllers/businessController';
import { adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business operations
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       201:
 *         description: Business created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', adminOnly, post_business);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: List of all businesses
 */
router.get('/', get_businesses);

/**
 * @swagger
 * /{businessId}:
 *   get:
 *     summary: Get a single business by ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business details
 *       404:
 *         description: Business not found
 */
router.get('/:businessId', get_business);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/', adminOnly, put_business);

/**
 * @swagger
 * /{businessId}:
 *   delete:
 *     summary: Delete a business by ID
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         schema:
 *           type: string
 *         required: true
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:businessId', adminOnly, delete_business);


export default router;
