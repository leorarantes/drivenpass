import { Safenotes } from "@prisma/client";

import prisma from "../database.js";

export async function insert(userId: number, title: string, note: string) {
    await prisma.safenotes.create({
        data: {
            userId,
            title,
            note
    }});
}

export async function getAll(userId: number) {
    const safeNotes: Array<Safenotes> = await prisma.safenotes.findMany({
        where: {
            userId
        }
    });
    return safeNotes;
}

export async function getById(id: number) {
    const safeNote: Safenotes = await prisma.safenotes.findUnique({
        where: {
            id
        }
    });
    return safeNote;
}

export async function getByTitleAndUserId(userId: number, title: string) {
    const safeNote: Safenotes = await prisma.safenotes.findFirst({
        where: {
            userId,
            title
        }
    });
    return safeNote;
}

export async function deleteOne(id: number) {
    await prisma.safenotes.delete({
        where: {
            id
        }
    });
}