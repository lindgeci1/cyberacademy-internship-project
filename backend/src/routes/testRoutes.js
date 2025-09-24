const express = require('express');
const router = express.Router();
const {testingController} = require('../controllers/testing_Db_Controller');


/** 
 * @swagger
 * /api/test:
 *   get:
 *     summary: Database conection
 *     description: Returing database connection status
 *     responses:
 *       200:
 *         description: Database Connected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
*/
router.get('/', testingController);

module.exports = router;