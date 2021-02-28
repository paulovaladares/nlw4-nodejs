import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";

class NpsController {
    /**
     * 1 2 3 4 5 6 7 8 9 10
     * Detratores: 0 - 6
     * Passivos: 7 - 8
     * Promotores: 9 - 10
     * NPS = (Promotores - Detratores) / Respondentes * 100
     */
    async execute(request:Request, response:Response){
        const { survey_id } = request.params;
        console.log(survey_id);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const answers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });
        console.log(answers);
        
        const totalAnswers = answers.length;
        const detractors = answers.filter(
            item => item.value >= 0 && item.value <= 6
        ).length;
        const passives = answers.filter(
            item => item.value >= 7 && item.value <= 8
        ).length;
        const promoters = answers.filter(
            item => item.value >= 9 && item.value <= 10
        ).length;
        const nps = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));
        return response.json({
            totalAnswers,
            detractors,
            passives,
            promoters,
            nps,
        })
    }
}

export default NpsController;