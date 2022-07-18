import { Cards } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import * as cardsRepository from "../repositories/cardsRepository.js";

export async function ensureTitleDoesntExist(userId: number, title: string) {
    const card: Cards = await cardsRepository.getByTitleAndUserId(userId, title);
    if(card) throw { type: "error_conflict", message: "Card already exists." };
}

export async function ensureCardExistsAndGetData(id: number) {
    const card: Cards = await cardsRepository.getById(id);
    if(!card) throw { type: "error_not_found", message: "Card doesnt exist." };
    return card;
}

export function ensureUserIsHolder(cardUserId: number, userId: number) {
    if(cardUserId !== userId) throw { type: "error_unauthorized", message: "User is not card holder." };
}

export function generateDecryptedCard(card: Cards) {
    const { id, userId, title, number, username, securityCode, expirationDate, password, isVirtual, debitEnabled, creditEnabled }: Cards = card;

    const passwordCryptr: Cryptr = new Cryptr(process.env.CARDS_PASSWORD_KEY);
    const decryptedPassword: string = passwordCryptr.decrypt(password);

    const CVVcryptr: Cryptr = new Cryptr(process.env.CVV_KEY);
    const decryptedCVV: string = CVVcryptr.decrypt(securityCode);

    return {
        id,
        userId,
        title,
        number,
        username,
        securityCode: decryptedCVV,
        expirationDate,
        password: decryptedPassword,
        isVirtual,
        debitEnabled,
        creditEnabled
    };
}