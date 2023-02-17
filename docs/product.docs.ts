/*
 *get all users
 */

/**
 * @swagger
 * /api/v1/product/available:
 *    get:
 *      summary: Get Only Available products from our API
 *      tags: [Product endpoints]
 *      description: Returns all available products from our database
 *      responses:
 *        200:
 *          description: Products fetched successfully
 */

/**
 * @swagger
 * /api/v1/product/:
 *   post:
 *     summary: Create a new product
 *     tags: [Product endpoints]
 *     requestBody:
 *       description: please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       '201':
 *         description: Post Created Successfully
 *       '400':
 *         description: This Product already exists, You can update the stock levels
 *       '401':
 *         description: You are not allowed to access this route
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateProductInput:
 *      type: object
 *      required:
 *        - name
 *        - category
 *        - description
 *        - stock
 *        - price
 *        - images
 *      properties:
 *        name:
 *          type: string
 *          default: Meat
 *        category:
 *          type: string
 *          default: Food
 *        description:
 *          type: string
 *          default: Quality meat for your whole family
 *        stock:
 *          type: string
 *          default: Available
 *        price:
 *          type: number
 *          default: 3
 *        images:
 *          type: string
 *          default:
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            category:
 *              type: string
 *            description:
 *              type: string
 *            stock:
 *              type: string
 *            price:
 *              type: number
 *            images:
 *              type: string
 */
