import express from 'express';
import {post_signin,post_signup } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint for user registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Successfully registered
 *       '400':
 *         description: Bad request
 */
router.post('/signup',post_signup);

// /**
//  * @swagger
//  * /users/signin:
//  *   post:
//  *     summary: User sign-in
//  *     description: Endpoint for user sign-in
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/LoginCredentials'
//  *     responses:
//  *       '200':
//  *         description: Successfully signed in
//  *       '401':
//  *         description: Unauthorized
//  */
router.post('/signin', post_signin);

export default router;