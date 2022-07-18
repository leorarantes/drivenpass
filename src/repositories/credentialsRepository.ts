import { Credentials } from "@prisma/client";

import prisma from "../database.js";

export async function insert(userId: number, url: string, title: string, username: string, password: string) {
    await prisma.credentials.create({
        data: {
            userId,
            url,
            title,
            username,
            password
    }});
}

export async function getAll(userId: number) {
    const credentials: Array<Credentials> = await prisma.credentials.findMany({
        where: {
            userId
        }
    });
    return credentials;
}

export async function getById(id: number, ) {
    const credential: Credentials = await prisma.credentials.findUnique({
        where: {
            id
        }
    });
    return credential;
}

export async function getByTitleAndUserId(userId: number, title: string) {
    const credential: Credentials = await prisma.credentials.findFirst({
        where: {
            userId,
            title
        }
    });
    return credential;
}

export async function deleteOne(id: number) {
    await prisma.credentials.delete({
        where: {
            id
        }
    });
}