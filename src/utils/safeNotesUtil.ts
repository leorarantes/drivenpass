import { Safenotes } from "@prisma/client";

import "../setup.js";
import * as safeNotesRepository from "../repositories/safeNotesRepository.js";

export async function ensureTitleDoesntExist(userId: number, title: string) {
    const safeNote = await safeNotesRepository.getByTitleAndUserId(userId, title);
    if(safeNote) throw { type: "error_existing_safe_note", message: "Safe note already exists." };
}

export async function ensureSafeNoteExistsAndGetData(id: number) {
    const safeNote: Safenotes = await safeNotesRepository.getById(id);
    if(!safeNote) throw { type: "error_non_existing_safenote", message: "safenote doesnt exist." };
    return safeNote;
}

export function ensureUserIsAuthor(safenoteUserId: number, userId: number) {
    if(safenoteUserId !== userId) throw { type: "error_invalid_author", message: "User is not safenote author." };
}