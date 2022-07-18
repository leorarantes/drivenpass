import { Users } from "@prisma/client";

import * as usersRepository from "../repositories/usersRepository.js";

export async function ensureUserDoesntExist(email: string) {
    const user = await usersRepository.getByEmail(email);
    if(user) throw { type: "error_existing_user", message: "User already exists." };
}

export async function ensureUserExistsAndGetData(email: string) {
    const user: Users = await usersRepository.getByEmail(email);
    if(!user) throw { type: "error_non_existing_user", message: "User doesnt exist." };
    return user;
}