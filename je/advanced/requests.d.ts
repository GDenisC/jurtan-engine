type Dictionary = Record<any, any>;
export type SessionParams = {
    headers: Dictionary;
};
export type RequestParams = SessionParams & {
    data: Dictionary;
};
export declare class Session {
    url: string;
    options: SessionParams;
    constructor(url: string, params?: Partial<SessionParams>);
    protected request(path: string, type: 'get' | 'post' | 'put' | 'delete', data?: Dictionary): Promise<unknown>;
    get(path?: string): Promise<unknown>;
    post(path?: string, data?: Dictionary): Promise<unknown>;
    put(path?: string, data?: Dictionary): Promise<unknown>;
    delete(path?: string, data?: Dictionary): Promise<unknown>;
    get urlScheme(): "http" | "https";
}
export declare const Request: {
    readonly get: (url: string, params?: SessionParams) => Promise<unknown>;
    readonly post: (url: string, params?: SessionParams) => Promise<unknown>;
    readonly put: (url: string, params?: SessionParams) => Promise<unknown>;
    readonly delete: (url: string, params?: SessionParams) => Promise<unknown>;
};
export {};
