import { Cards } from "@prisma/client";

import prisma from "../database.js";

export async function insert(userId: number, title: string, number: string, username: string, securityCode: string, expirationDate: string, password: string, isVirtual: boolean, debitEnabled: boolean, creditEnabled: boolean) {
    await prisma.cards.create({
        data: {
            userId,
            title,
            number,
            username,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            debitEnabled,
            creditEnabled
    }});
}

export async function getAll(userId: number) {
    const cards: Array<Cards> = await prisma.cards.findMany({
        where: {
            userId
        }
    });
    return cards;
}

export async function getById(id: number) {
    const card: Cards = await prisma.cards.findUnique({
        where: {
            id
        }
    });
    return card;
}

export async function getByTitleAndUserId(userId: number, title: string) {
    const card: Cards = await prisma.cards.findFirst({
        where: {
            userId,
            title
        }
    });
    return card;
}

export async function deleteOne(id: number) {
    await prisma.cards.delete({
        where: {
            id
        }
    });
}