import "isomorphic-fetch";

export interface FetchOptions {
  uri?: string;
  body?: any;
  mode?: string;
  method?: string;
  apiKey?: string;
  baseHeaders?: { [x: string]: string };
  additionalHeaders?: { [x: string]: string };
}

// @ts-ignore
if (typeof globalThis.navigator === "undefined") globalThis.navigator = {};

export function getHeaders({
  isPost,
  baseHeaders,
  additionalHeaders,
}: Partial<FetchOptions> & { isPost: boolean }) {
  const headers =
    baseHeaders && Object.keys(baseHeaders).length > 0
      ? baseHeaders
      : isPost
      ? {
          "Accept-Encoding": "gzip",
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      : { "Accept-Encoding": "gzip", Accept: "application/json" };
  const headersMap = {
    ...headers,
    ...additionalHeaders,
  };

  return headersMap;
}

export const getOptions = (_options: FetchOptions | string) => {
  let options;
  if (!_options || typeof _options === "string") {
    options = {};
  } else {
    options = _options;
  }
  const {
    baseHeaders,
    additionalHeaders,
    apiKey,
    method: _method,
    body: _body,
    mode,
    ...passThrough
  } = options;
  const method = _method || "GET";
  const isPost = ["put", "post"].indexOf(method.toLowerCase()) !== -1;
  const headers = new Headers();

  const headersMap = getHeaders({ baseHeaders, additionalHeaders, isPost });
  for (const k of Object.keys(headersMap)) {
    headers.append(k, headersMap[k]);
  }

  if (navigator && navigator.userAgent) {
    headers.append("User-Agent", navigator.userAgent);
  }

  if (apiKey) {
    const encoded = "Bearer " + apiKey;
    // Send both of these!!
    headers.append("Authorization", encoded);
  }

  let body;
  if (isPost) {
    if (typeof _body == "string") {
      body = _body;
    } else if (_body) {
      body = JSON.stringify(_body);
    }
  }
  return {
    ...passThrough,
    method,
    body,
    headers,
    mode: mode !== undefined ? mode : "cors",
    cache: "default" as RequestCache,
  };
};

export const uapiFetch = (_options: FetchOptions | string) => {
  const { uri, ...iFetchOptions } = getOptions(_options);
  // console.log(iFetchOptions);
  return fetch(uri, iFetchOptions);
};
