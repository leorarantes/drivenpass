import { Credentials, Users } from "@prisma/client";

export type UserData = Omit<Users, "id">;

export type CredentialData = Omit<Credentials, "id">;