import { Credentials, Safenotes, Users } from "@prisma/client";

export type UserData = Omit<Users, "id">;
export type CredentialData = Omit<Credentials, "id">;
export type SafeNoteData = Omit<Safenotes, "id">;