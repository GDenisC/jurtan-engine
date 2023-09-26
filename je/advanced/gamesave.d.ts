export declare const GameSaves: {
    readonly load: (key: string) => string | null;
    readonly save: (key: string, value: string) => void;
    readonly delete: (key: string) => void;
    readonly loadJson: (key: string) => any;
    readonly saveJson: (key: string, value: any) => void;
    readonly deleteAll: () => void;
};
export declare class GameSave<T = any> {
    readonly gameId: string;
    data: T;
    constructor(gameId: string);
    saveAll(): void;
}
