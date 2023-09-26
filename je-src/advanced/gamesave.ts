export const GameSaves = {
    load: (key: string) => localStorage.getItem(key),
    save: (key: string, value: string) => localStorage.setItem(key, value),
    delete: (key: string) => localStorage.removeItem(key),

    loadJson: (key: string) => {
        const value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value);
    },
    saveJson: (key: string, value: any) => GameSaves.save(key, JSON.stringify(value)),

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