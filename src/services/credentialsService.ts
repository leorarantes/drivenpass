import { Credentials } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import { CredentialData } from "../utils/interfaces.js";
import { ensureTitleDoesntExist, ensureCredentialExistsAndGetData, ensureUserIsAuthor, generateDecryptedCredential } from "../utils/credentialsUtil.js";
import * as credentialsRepository from "../repositories/credentialsRepository.js";

export async function createOne(credential: CredentialData) {
    const { userId, url, title, username, password }: CredentialData = credential;

    await ensureTitleDoesntExist(userId, title);

    // create encrypted password
    const cryptr: Cryptr = new Cryptr(process.env.CREDENTIALS_PASSWORD_KEY);
    const encryptedPassword: string = cryptr.encrypt(password);

    await credentialsRepository.insert(userId, url, title, username, encryptedPassword);
}

export async function getAll(userId: number) {
    const credentials: Array<Credentials> = await credentialsRepository.getAll(userId);

    const decryptedCredentials = credentials.map((credential: Credentials) => {
        const decryptedCredential: Credentials = generateDecryptedCredential(credential);
        return decryptedCredential;
    });

    return { credentials: decryptedCredentials };
}

export async function getOne(userId: number, id: string) {
    const credential: Credentials = await ensureCredentialExistsAndGetData(parseInt(id));

    ensureUserIsAuthor(credential.userId, userId);

    const decryptedCredential: Credentials = generateDecryptedCredential(credential);

    return decryptedCredential;
}

export async function deleteOne(userId: number, id: string) {
    const credential: Credentials = await ensureCredentialExistsAndGetData(parseInt(id));

    ensureUserIsAuthor(credential.userId, userId);

    await credentialsRepository.deleteOne(credential.id);
}