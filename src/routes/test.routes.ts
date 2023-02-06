import { Request, Response, Router } from 'express';

const testRouter = Router();

testRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: 200,
        success: true,
        message: `Hello, I am an example of how, as a route, I could be set up. 😃`,
    });
});

export default testRouter;
