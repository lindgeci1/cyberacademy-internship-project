const express = require('express');
const router = express.Router();


const {login} = require('../controllers/loginController');


/**
 * @swagger 
 * /api/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: User login
 *     description: Returns the JWT
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *                 example: "User 1"
 *               password:
 *                 type: string
 *                 example: "User#123"
 *     responses:
 *       200:
 *         description: JWT returned
 */
router.post('/login', login);

module.exports = router;