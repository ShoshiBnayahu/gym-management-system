import express from 'express';
import { delete_service, get_service, get_services, post_service, put_service } from '../controllers/serviceController';
import { adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service operations
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', adminOnly, post_service);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of all services
 */
router.get('/', get_services);

/**
 * @swagger
 * /{serviceId}:
 *   get:
 *     summary: Get a single service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service details
 *       404:
 *         description: Service not found
 */
router.get('/:serviceId', get_service);

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put('/', adminOnly, put_service);

/**
 * @swagger
 * /{serviceId}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:serviceId', adminOnly, delete_service);


export default router;
