import { Crypt } from "./crypt.js";
export const GameSaves = {
    load: (key) => localStorage.getItem(key),
    save: (key, value) => localStorage.setItem(key, value),
    delete: (key) => localStorage.removeItem(key),
    loadJson: (key) => {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        return JSON.parse(Crypt.decodeBase64(Crypt.reverse(value)));
    },
    saveJson: (key, value) => GameSaves.save(key, Crypt.reverse(Crypt.encodeBase64(JSON.stringify(value)))),
    deleteAll: () => localStorage.clear()
};
export class GameSave {
    constructor(gameId) {
        this.gameId = gameId;
        const saves = GameSaves.loadJson(gameId);
        this.data = (saves != null) ? saves : {};
    }
    saveAll() {
        GameSaves.saveJson(this.gameId, this.data);
    }
}
//# sourceMappingURL=gamesave.js.map