import { Wifis } from "@prisma/client";

import prisma from "../database.js";

export async function insert(userId: number, title: string, password: string) {
    await prisma.wifis.create({
        data: {
            userId,
            title,
            password
    }});
}

export async function getAll(userId: number) {
    const wifis: Array<Wifis> = await prisma.wifis.findMany({
        where: {
            userId
        }
    });
    return wifis;
}

export async function getById(id: number) {
    const wifi: Wifis = await prisma.wifis.findUnique({
        where: {
            id
        }
    });
    return wifi;
}

export async function getByTitleAndUserId(userId: number, title: string) {
    const wifi: Wifis = await prisma.wifis.findFirst({
        where: {
            userId,
            title
        }
    });
    return wifi;
}

export async function deleteOne(id: number) {
    await prisma.wifis.delete({
        where: {
            id
        }
    });
}