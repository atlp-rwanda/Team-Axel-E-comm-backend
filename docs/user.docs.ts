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

/**
 * @swagger
 * /api/v1/auth/2fa:
 *   post:
 *     summary: enable two factor authentication on your account
 *     tags: [two factor auth routes]
 *     responses:
 *       '200':
 *         description: code was sent on your email
 */

/**
 * @swagger
 * /api/v1/auth/2fa/verify2FAToken:
 *   post:
 *     summary: verify your 2fa code
 *     requestBody:
 *       description: please fill the code sent on your email[it will expire in 5 minutes]
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/_2faInput'
 *     tags: [two factor auth routes]
 *     responses:
 *       '200':
 *         description: code verified successfuly
 */

/**
 * @swagger
 * /api/v1/auth/updatepassword:
 *   post:
 *     summary: request for updating password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordUpdate'
 *     tags: [password update]
 *     responses:
 *       '200':
 *         description: passwod updated successfuly
 */
