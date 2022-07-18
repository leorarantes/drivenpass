import { Safenotes } from "@prisma/client";

import "../setup.js";
import { SafeNoteData } from "../utils/interfaces.js";
import { ensureTitleDoesntExist, ensureSafeNoteExistsAndGetData, ensureUserIsAuthor} from "../utils/safeNotesUtil.js";
import * as safeNotesRepository from "../repositories/safeNotesRepository.js";

export async function createOne(safeNote: SafeNoteData) {
    const { userId, title, note }: SafeNoteData = safeNote;

    await ensureTitleDoesntExist(userId, title);

    await safeNotesRepository.insert(userId, title, note);
}

export async function getAll(userId: number) {
    const safeNotes: Array<Safenotes> = await safeNotesRepository.getAll(userId);
    return { safeNotes };
}

export async function getOne(userId: number, id: string) {
    const safeNote: Safenotes = await ensureSafeNoteExistsAndGetData(parseInt(id));

    ensureUserIsAuthor(safeNote.userId, userId);

    return safeNote;
}

export async function deleteOne(userId: number, id: string) {
    const safeNote: Safenotes = await ensureSafeNoteExistsAndGetData(parseInt(id));

    ensureUserIsAuthor(safeNote.userId, userId);

    await safeNotesRepository.deleteOne(safeNote.id);
}