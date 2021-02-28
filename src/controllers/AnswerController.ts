import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";

class AnswerController {
    async execute(request:Request, response:Response) {
        // const { params, query } = request;
        const { value } = request.params;
        const { suid } = request.query;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(suid)
        })

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey Usr does not exist"
            })
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export default AnswerController;