import axios, { AxiosError } from 'axios';

type Dictionary = Record<any, any>;

export type SessionParams = {
    headers: Dictionary
}

export type RequestParams = SessionParams & {
    data: Dictionary
}

export class Session {
    public options: SessionParams;

    constructor(public url: string, params: Partial<SessionParams> = {}) {
        params.headers ??= {};
        this.options = params as SessionParams;
    }

    protected async request(path: string, type: 'get' | 'post' | 'put' | 'delete', data?: Dictionary) {
        try {
            return await axios[type].apply(
                null,
                [this.url + path, type != 'get' ? data : null, this.options]
                    .filter(x => x != null) as any
            );
        } catch (e) {
            const error = e as AxiosError;
            if (error.response)
                return error.response;
            throw error;
        }
    }

    get(path: string = '') {
        return this.request(path, 'get');
    }

    post(path: string = '', data?: Dictionary) {
        return this.request(path, 'post', data);
    }

    put(path: string = '', data?: Dictionary) {
        return this.request(path, 'put', data);
    }

    delete(path: string = '', data?: Dictionary) {
        return this.request(path, 'delete', data);
    }

    get urlScheme() {
        return this.url.startsWith('https://') ? 'https' : 'http';
    }
}

export const Request = {
    get:    (url: string, params?: SessionParams) => new Session(url, params).get(),
    post:   (url: string, params?: SessionParams) => new Session(url, params).post(),
    put:    (url: string, params?: SessionParams) => new Session(url, params).put(),
    delete: (url: string, params?: SessionParams) => new Session(url, params).delete(),
} as const;