import { faker } from '@faker-js/faker';
import { Cards } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import { CardData } from "../utils/interfaces.js";
import { ensureTitleDoesntExist, ensureCardExistsAndGetData, ensureUserIsHolder, generateDecryptedCard } from "../utils/cardsUtil.js";
import * as cardsRepository from "../repositories/cardsRepository.js";

export async function createOne(card: CardData) {
    const { userId, title, username, password, isVirtual, debitEnabled, creditEnabled }: CardData = card;

    await ensureTitleDoesntExist(userId, title);

    // create card number;
    const number: string = faker.finance.creditCardNumber();

    // create card holder name
    const fullNameArray: string[] = username.split(' ');
    const cardholderNameArray: string[] = fullNameArray.map((element, index) => {
        if(index === 0 || index === fullNameArray.length-1) return (element.toUpperCase());
        return (element[0].toUpperCase());
    });
    const cardholderName: string = cardholderNameArray.join(" ");

    // create encrypted password
    const passwordCryptr: Cryptr = new Cryptr(process.env.CARDS_PASSWORD_KEY);
    const encryptedPassword: string = passwordCryptr.encrypt(password);

    // create encrypted CVV
    const CVV: string = faker.finance.creditCardCVV();
    const CVVcryptr: Cryptr = new Cryptr(process.env.CVV_KEY);
    const encryptedCVV: string = CVVcryptr.encrypt(CVV);

    // create expiration date
    const date: Date = new Date;
    let year: number = date.getFullYear();
    year += 5;
    const strYear: string = "" + year;
    let month: number = date.getMonth();
    const strMonth = month >= 10 ? "" + month : "0" + month;
    const expDate: string = strMonth + "/" + strYear;

    await cardsRepository.insert(userId, title, number, cardholderName, encryptedCVV, expDate, encryptedPassword, isVirtual, debitEnabled, creditEnabled);
}

export async function getAll(userId: number) {
    const cards: Array<Cards> = await cardsRepository.getAll(userId);

    const decryptedCards: Array<Cards> = cards.map((card: Cards) => {
        const decryptedCard: Cards = generateDecryptedCard(card);
        return decryptedCard;
    });

    return { cards: decryptedCards };
}

export async function getOne(userId: number, id: string) {
    const card: Cards = await ensureCardExistsAndGetData(parseInt(id));

    ensureUserIsHolder(card.userId, userId);

    const decryptedCard: Cards = generateDecryptedCard(card);

    return decryptedCard;
}

export async function deleteOne(userId: number, id: string) {
    const card: Cards = await ensureCardExistsAndGetData(parseInt(id));

    ensureUserIsHolder(card.userId, userId);

    await cardsRepository.deleteOne(card.id);
}