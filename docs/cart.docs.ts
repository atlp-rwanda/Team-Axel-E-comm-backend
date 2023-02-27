/**
 * @swagger
 * /api/v1/cart/{productId}:
 *    delete:
 *      tags: [User Cart Routes]
 *      summary: Delete a product from cart
 *      parameters:
 *        - name: productId
 *          in: path
 *          description: Provide product id
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        500:
 *          description: Internal Server Error
 */
