import { Wifis } from "@prisma/client";
import Cryptr from 'cryptr';

import "../setup.js";
import { WifiData } from "../utils/interfaces.js";
import { ensureTitleDoesntExist, ensureWifiExistsAndGetData, ensureUserIsHolder, generateDecryptedWifi } from "../utils/wifisUtil.js";
import * as wifisRepository from "../repositories/wifisRepository.js";

export async function createOne(wifi: WifiData) {
    const { userId, title, password }: WifiData = wifi;

    await ensureTitleDoesntExist(userId, title);

    // create encrypted password
    const cryptr: Cryptr = new Cryptr(process.env.WIFIS_PASSWORD_KEY);
    const encryptedPassword: string = cryptr.encrypt(password);

    await wifisRepository.insert(userId, title, encryptedPassword);
}

export async function getAll(userId: number) {
    const wifis: Array<Wifis> = await wifisRepository.getAll(userId);

    const decryptedWifis = wifis.map((wifi: Wifis) => {
        const decryptedWifi: Wifis = generateDecryptedWifi(wifi);
        return decryptedWifi;
    });

    return { wifis: decryptedWifis };
}

export async function getOne(userId: number, id: string) {
    const wifi: Wifis = await ensureWifiExistsAndGetData(parseInt(id));

    ensureUserIsHolder(wifi.userId, userId);

    const decryptedWifi: Wifis = generateDecryptedWifi(wifi);

    return decryptedWifi;
}

export async function deleteOne(userId: number, id: string) {
    const wifi: Wifis = await ensureWifiExistsAndGetData(parseInt(id));

    ensureUserIsHolder(wifi.userId, userId);

    await wifisRepository.deleteOne(wifi.id);
}