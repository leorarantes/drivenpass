import { Wifis } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import * as wifisRepository from "../repositories/wifisRepository.js";

export async function ensureTitleDoesntExist(userId: number, title: string) {
    const wifi = await wifisRepository.getByTitleAndUserId(userId, title);
    if(wifi) throw { type: "error_conflict", message: "Wifi already exists." };
}

export async function ensureWifiExistsAndGetData(id: number) {
    const wifi: Wifis = await wifisRepository.getById(id);
    if(!wifi) throw { type: "error_not_found", message: "Wifi doesnt exist." };
    return wifi;
}

export function ensureUserIsHolder(wifiUserId: number, userId: number) {
    if(wifiUserId !== userId) throw { type: "error_unauthorized", message: "User is not wifi holder." };
}

export function generateDecryptedWifi(wifi: Wifis) {
    const {id, userId, title, password}: Wifis = wifi;

    const cryptr: Cryptr = new Cryptr(process.env.WIFIS_PASSWORD_KEY);
    const decryptedPassword: string = cryptr.decrypt(password);

    return {
        id,
        userId,
        title,
        password: decryptedPassword
    };
}