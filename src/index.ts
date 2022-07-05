import { parsePathComponents, applyPathComponents } from "./lib";
import { uapiFetch, FetchOptions, getOptions } from "./fetch";
export { FetchOptions };

export interface WellKnown {
  endpoint: string; // 'https://signet.codes/uapi/v1',
  "path-components"?: string; // 'https://s.chroma.io/:id',
  vendor?: string; // 'Chroma'
  example?: {
    qr: string;
  };
}

const info: { [x: string]: WellKnown } = {};

export const Endpoints = {
  case: {
    get: "case/{:id}",
    post: "case/{:id}",
  },
  each: {
    get: "each/{:id}",
    post: "each/{:id}",
  },
  regulator: {
    get: "regulator/{:id}",
    post: "regulator/{:id}",
  },
};

export const getQr = async (
  qr: string,
  route = "case",
  options?: FetchOptions
) => {
  const { endpoint, ["path-components"]: pathComponents } =
    await fetchEndpointInfo(qr);
  let vars = {};
  const qrPathDefinition = pathComponents;
  let uri = endpoint;
  if (qrPathDefinition) {
    vars = parsePathComponents(qr, qrPathDefinition);
    const endpointPathDefinition = `${endpoint}/${Endpoints[route].get}`;
    uri = applyPathComponents(endpointPathDefinition, vars);
  }
  const res = await uapiFetch({ uri, ...options });
  return await res.json();
};

export const postQr = async (
  qr: string,
  route = "case",
  options?: FetchOptions
) => {
  const { endpoint, ["path-components"]: pathComponents } =
    await fetchEndpointInfo(qr);
  let vars = {};
  const qrPathDefinition = pathComponents;
  let uri = endpoint;
  if (qrPathDefinition) {
    vars = parsePathComponents(qr, qrPathDefinition);
    const endpointPathDefinition = `${endpoint}/${Endpoints[route].get}`;
    uri = applyPathComponents(endpointPathDefinition, vars);
  }
  const res = await uapiFetch({ uri, method: "POST", ...options });
  return await res.json();
};

export { postQr as putQr };

export { uapiFetch };
export { getOptions };

export const fetchEndpointInfo = async (
  qr: string,
  apiKey?: string
): Promise<WellKnown> => {
  const url = new URL(qr);
  if (info[url.host] !== undefined) return info[url.host];

  const endpoint = `https://${url.host}`;
  const endpointInfo = `${endpoint}/.well-known/cannabis-api.json`;
  const res = await fetch(endpointInfo);
  const body = await res.json();

  info[url.host] = body;
  return info[url.host];
};
