import "isomorphic-fetch";
export interface FetchOptions {
    uri?: string;
    body?: any;
    mode?: string;
    method?: string;
    apiKey?: string;
    baseHeaders?: {
        [x: string]: string;
    };
    additionalHeaders?: {
        [x: string]: string;
    };
}
export declare function getHeaders({ isPost, baseHeaders, additionalHeaders, }: Partial<FetchOptions> & {
    isPost: boolean;
}): {
    [x: string]: string;
};
export declare const getOptions: (_options: FetchOptions | string) => any;
export declare const uapiFetch: (_options: FetchOptions | string) => Promise<Response>;
