/*
 *get all users
 */

/**
 * @swagger
 * /api/v1/user/all:
 *    get:
 *      tags: [user routes]
 *      description: Returns all users from our database
 *      responses:
 *        200:
 *          description: Get all users from our API
 */

/*
 *  get one user
 */
/**
 * @swagger
 * /api/v1/user/{userId}:
 *    get:
 *      tags: [user routes]
 *      summary: returns a one user should provide userId from our database
 *      parameters:
 *        - name: userId
 *          in: path
 *          description: provide userId
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *        404:
 *          description: not found
 */
