import express from 'express';
import { signUp, signIn } from '../services/userService';

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint for user registration
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Bad request
 */
router.post('/signup', signUp);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User sign-in
 *     description: Endpoint for user sign-in
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       '200':
 *         description: Successfully signed in
 *       '401':
 *         description: Unauthorized
 */
router.post('/signin', signIn);

export default router;