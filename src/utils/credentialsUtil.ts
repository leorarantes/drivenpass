import { Credentials } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import * as credentialsRepository from "../repositories/credentialsRepository.js";

export async function ensureTitleDoesntExist(userId: number, title: string) {
    const credential = await credentialsRepository.getByTitleAndUserId(userId, title);
    if(credential) throw { type: "error_conflict", message: "Credential already exists." };
}

export async function ensureCredentialExistsAndGetData(id: number) {
    const credential: Credentials = await credentialsRepository.getById(id);
    if(!credential) throw { type: "error_not_found", message: "Credential doesnt exist." };
    return credential;
}

export function ensureUserIsHolder(credentialUserId: number, userId: number) {
    if(credentialUserId !== userId) throw { type: "error_unauthorized", message: "User is not credential holder." };
}

export function generateDecryptedCredential(credential: Credentials) {
    const {id, userId, url, title, username, password}: Credentials = credential;

    const cryptr: Cryptr = new Cryptr(process.env.CREDENTIALS_PASSWORD_KEY);
    const decryptedPassword: string = cryptr.decrypt(password);

    return {
        id,
        userId,
        url,
        title,
        username,
        password: decryptedPassword
    };
}