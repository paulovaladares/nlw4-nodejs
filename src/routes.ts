import { Router } from 'express';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NPSController';
import SendMailController from './controllers/SendMailController';
import SurveyController from './controllers/SurveyController';
import UserController from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.post("/survey", surveyController.create);
router.get("/survey", surveyController.show);
router.post("/send-mail", sendMailController.execute);
router.get("/answers/:value", answerController.execute);
router.get("/nps/:survey_id", npsController.execute);
/* 
app.get("/", (req, res) => {
    return res.json({"message": "Hello !!!!"})
});

app.post("/", (req, res) => {
    return res.json({"message": "Dados ok"})
})
*/

export default router;