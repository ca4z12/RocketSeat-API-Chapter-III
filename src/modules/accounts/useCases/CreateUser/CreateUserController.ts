import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

import { container } from "tsyringe";


class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password, email, driver_license } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license,
        });

        return res.status(201).send();
    }

}

export { CreateUserController }