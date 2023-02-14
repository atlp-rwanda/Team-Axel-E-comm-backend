/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - surname
 *        - givenName
 *        - email
 *        - password
 *      properties:
 *        surname:
 *          type: string
 *          default: SENJU
 *        givenName:
 *          type: string
 *          default: Tobirama
 *        email:
 *          type: string
 *          default: tobirama@senju.com
 *        password:
 *          type: string
 *          default: Password!23
 *        confirm_password:
 *          type: string
 *          default: Password!23
 *    _2faInput:
 *      type: object
 *      required:
 *        - code
 *      properties:
 *        code:
 *          type: string
 *          default: 828923
 */
