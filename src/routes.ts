import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();
const userController = new UserController();

router.post("/users", userController.create);

/* 
app.get("/", (req, res) => {
    return res.json({"message": "Hello !!!!"})
});

app.post("/", (req, res) => {
    return res.json({"message": "Dados ok"})
})
*/

export default router;