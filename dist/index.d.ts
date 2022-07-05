import { uapiFetch, FetchOptions, getOptions } from "./fetch";
export { FetchOptions };
export interface WellKnown {
    endpoint: string;
    "path-components"?: string;
    vendor?: string;
    example?: {
        qr: string;
    };
}
export declare const Endpoints: {
    case: {
        get: string;
        post: string;
    };
    each: {
        get: string;
        post: string;
    };
    regulator: {
        get: string;
        post: string;
    };
};
export declare const getQr: (qr: string, route?: string, options?: FetchOptions) => Promise<any>;
export declare const postQr: (qr: string, route?: string, options?: FetchOptions) => Promise<any>;
export { postQr as putQr };
export { uapiFetch };
export { getOptions };
export declare const fetchEndpointInfo: (qr: string, apiKey?: string) => Promise<WellKnown>;
