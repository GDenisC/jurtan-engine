import { Crypt } from "./crypt.js";

export const GameSaves = {
    load: (key: string) => localStorage.getItem(key),
    save: (key: string, value: string) => localStorage.setItem(key, value),
    delete: (key: string) => localStorage.removeItem(key),

    loadJson: (key: string) => {
        const value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(Crypt.decodeBase64(Crypt.reverse(value)));
    },
    saveJson: (key: string, value: any) => GameSaves.save(key, Crypt.reverse(Crypt.encodeBase64(JSON.stringify(value)))),

    deleteAll: () => localStorage.clear()
} as const;

export class GameSave<T = any> {
    data: T;

    constructor(readonly gameId: string) {
        const saves = GameSaves.loadJson(gameId);
        this.data = (saves != null) ? saves : {};
    }

    saveAll() {
        GameSaves.saveJson(this.gameId, this.data);
    }
}