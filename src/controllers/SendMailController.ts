import { resolve } from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";
import SurveyRepository from "../repositories/SurveysRepository";
import UsersRepository from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import AppError from '../errors/AppError';

class SendMailController {
    async execute(request:Request, response:Response) {
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const user = await usersRepository.findOne({ email });

        if(!user) {
            throw new AppError("User does not exist", 400);
        }
        
        const survey = await surveyRepository.findOne({ id: survey_id });
        
        if (!survey) {
            throw new AppError("Survey does not exist", 400);
        }

        const surveySent = await surveysUsersRepository.findOne({ 
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"]
         });

         const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
         const bodyInfo = {
             name: user.name,
             title: survey.title,
             description: survey.description,
             link: process.env.URL_MAIL,
             suid: ""
         }

         if (surveySent) {
             bodyInfo.suid = surveySent.id;
             await SendMailService.execute(email, survey.title, npsPath, bodyInfo);
             return response.json(surveySent);
         }

        // Save data in database
        const surveyUser = surveysUsersRepository.create({ 
            user_id: user.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);
        
        
        // send email
        bodyInfo.suid = survey.id;
        await SendMailService.execute(email, survey.title, npsPath, bodyInfo);

        return response.json(surveyUser);
    }
}

export default SendMailController;