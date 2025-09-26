const express = require('express');
const router = express.Router();
const {
    getResources,
    getResourceByID,
    createResource,
    updateResource,
    deleteResources

} = require('../controllers/resourcesController');
const authenticate = require('../config/authmiddleware');

/**
 * @swagger
 * /api/resources/getall:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get all resources
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/getall', authenticate, getResources);

/**
 * @swagger
 * /api/resources/getId/{id}:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get a resource  by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the specific resource
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *       404:
 *         description: Resource not found   
 *       500:
 *         description: Server error
 */
router.get('/getId/:id',authenticate, getResourceByID);

/**
 * @swagger
 * /api/resources/create:
 *   post:
 *     tags:
 *       - Resources
 *     summary: Create a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - title
 *               - description
 *               - category
 *               - link
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the resource
 *               description:
 *                 type: string
 *                 description: A description of the resource
 *               category:
 *                 type: string
 *                 description: The category of the resource
 *               link:
 *                 type: string
 *                 description: A link associated with the resource
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found   
 *       500:
 *         description: Server error
 */
router.post('/create', authenticate, createResource);

/**
 * @swagger
 * /api/resources/update/{id}:
 *   put:
 *     tags:
 *       - Resources
 *     summary: Update a resource  by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the specific resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - title
 *               - description
 *               - category
 *               - link
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the resource
 *               description:
 *                 type: string
 *                 description: A description of the resource
 *               category:
 *                 type: string
 *                 description: The category of the resource
 *               link:
 *                 type: string
 *                 description: A link associated with the resource
 *     responses:
 *       200:
 *         description: Resource created successfully
 *       500:
 *         description: Server error
 */

router.put('/update/:id',authenticate,  updateResource);





/**
 * @swagger
 * /api/resources/delete/{id}:
 *   delete:
 *     tags:
 *       - Resources
 *     summary: Delete a resource  by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the resource to delete 
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found   
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id',authenticate,  deleteResources);

module.exports = router;