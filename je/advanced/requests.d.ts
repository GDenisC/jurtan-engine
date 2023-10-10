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
    protected request(path: string, type: 'get' | 'post' | 'put' | 'delete', data?: Dictionary): Promise<any>;
    get(path?: string): Promise<any>;
    post(path?: string, data?: Dictionary): Promise<any>;
    put(path?: string, data?: Dictionary): Promise<any>;
    delete(path?: string, data?: Dictionary): Promise<any>;
    get urlScheme(): "https" | "http";
}
export declare const Request: {
    readonly get: (url: string, params?: SessionParams) => Promise<any>;
    readonly post: (url: string, params?: SessionParams) => Promise<any>;
    readonly put: (url: string, params?: SessionParams) => Promise<any>;
    readonly delete: (url: string, params?: SessionParams) => Promise<any>;
};
export {};
