import { injectable, inject } from "tsyringe";
import { hash,  } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/Apperror";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}

    async execute({ 
        name,
        password, 
        email,
        driver_license 
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new AppError("Email already in use")
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({ 
            name, 
            password: passwordHash, 
            email, 
            driver_license,
        });
    }
}

export { CreateUserUseCase }