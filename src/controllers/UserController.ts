import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import * as yup from "yup";
import AppError from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        const schema = yup.object().shape({
            name: yup.string().required("Name is missing"),
            email: yup.string().email("Email is not valid").required("Email is missing")
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error, 400);
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new AppError("User already exist", 400);
        } 

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
        
    }
}

export default UserController;