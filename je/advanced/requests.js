var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let req = window['axios'];
if (req == undefined) {
    req = {};
    for (const type of ['get', 'post', 'put', 'delete']) {
        req[type] = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield fetch(url, Object.assign({ method: type.toUpperCase() }, options));
            const { status, statusText, headers } = res;
            let data = null;
            try {
                data = yield res.json();
            }
            catch (_a) {
                data = yield res.text();
            }
            return { data, status, statusText, headers };
        });
    }
}
export class Session {
    constructor(url, params = {}) {
        var _a;
        this.url = url;
        (_a = params.headers) !== null && _a !== void 0 ? _a : (params.headers = {});
        this.options = params;
    }
    request(path, type, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield req[type].apply(null, [this.url + path, type != 'get' ? data : null, this.options]
                    .filter(x => x != null));
            }
            catch (e) {
                const error = e; // AxiosError
                if (error.response)
                    return error.response;
                throw error;
            }
        });
    }
    get(path = '') {
        return this.request(path, 'get');
    }
    post(path = '', data) {
        return this.request(path, 'post', data);
    }
    put(path = '', data) {
        return this.request(path, 'put', data);
    }
    delete(path = '', data) {
        return this.request(path, 'delete', data);
    }
    get urlScheme() {
        return this.url.startsWith('https://') ? 'https' : 'http';
    }
}
export const Request = {
    get: (url, params) => new Session(url, params).get(),
    post: (url, params) => new Session(url, params).post(),
    put: (url, params) => new Session(url, params).put(),
    delete: (url, params) => new Session(url, params).delete(),
};
//# sourceMappingURL=requests.js.map