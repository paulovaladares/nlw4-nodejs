import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
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
            throw new AppError("Survey User does not exist", 400);
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export default AnswerController;