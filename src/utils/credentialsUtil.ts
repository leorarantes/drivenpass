import { Credentials } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import * as credentialsRepository from "../repositories/credentialsRepository.js";

export async function ensureTitleDoesntExist(userId: number, title: string) {
    const credential = await credentialsRepository.getByTitleAndUserId(userId, title);
    if(credential) throw { type: "error_existing_credential", message: "Credential already exists." };
}

export async function ensureCredentialExistsAndGetData(id: number) {
    const credential: Credentials = await credentialsRepository.getById(id);
    if(!credential) throw { type: "error_non_existing_credential", message: "Credential doesnt exist." };
    return credential;
}

export function ensureUserIsAuthor(credentialUserId: number, userId: number) {
    if(credentialUserId !== userId) throw { type: "error_invalid_author", message: "User is not credential author." };
}

export function generateDecryptedCredential(credential: Credentials) {
    const {id, userId, url, title, username, password}: Credentials = credential;

    const cryptr: Cryptr = new Cryptr(process.env.PASSWORD_KEY);
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